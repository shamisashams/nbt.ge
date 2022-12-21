<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use App\Models\Attribute;
use App\Models\News;
use App\Models\Page;
use App\Models\Partner;
use App\Models\Product;
use App\Models\ProductAttributeValue;
use App\Models\ProductSet;
use App\Models\Project;
use App\Models\Slider;
use Illuminate\Support\Facades\App;
use Inertia\Inertia;
use App\Repositories\Eloquent\ProductRepository;


class HomeController extends Controller
{
    public function index()
    {


        $page = Page::with(['sections.translation','sections.file'])->where('key', 'home')->firstOrFail();

        $images = [];
        $sections = [];
        foreach ($page->sections as $section){
            if($section->file){
                $images[] = $section->file->thumb_full_url;
            } else {
                $images[] = null;
            }
            $sections[] = $section;
        }

        //dd($sections);

        $sliders = Slider::query()->where("status", 1)->with(['file', 'translations','logo'])->get();
//        dd($page->file);
        //dd($sliders);
        //$_products = app(ProductRepository::class)->getHomePageProducts();





        $colorIds = [];
        $attribute = Attribute::with(['options.translation'])->where('code','color')->first();
        foreach ($attribute->options as $option){
            $colorIds[] = $option->id;
        }

        $attribute_values = ProductAttributeValue::with(['product.translation','product.latestImage','option.translation'])->where('attribute_id',$attribute->id)
            ->whereIn('integer_value',$colorIds)
            ->groupBy('integer_value')
            ->get();
        //dd($attribute_values);




        $products = $attribute_values;
        //dd($products);




        return Inertia::render('Home', [
            "sliders" => $sliders,
            "partners" => Partner::query()->orderBy('company_name')->get(),
            "page" => $page, "seo" => [
            "title"=>$page->meta_title,
            "description"=>$page->meta_description,
            "keywords"=>$page->meta_keyword,
            "og_title"=>$page->meta_og_title,
            "og_description"=>$page->meta_og_description,

//            "image" => "imgg",
//            "locale" => App::getLocale()
        ],
            'products' => $products,
            'images' => $images,
            'sections' => $sections,
            'projects' => Project::with(['translation','latestImage'])->limit(4)->get()
        ])->withViewData([
            'meta_title' => $page->meta_title,
            'meta_description' => $page->meta_description,
            'meta_keyword' => $page->meta_keyword,
            "image" => $page->file,
            'og_title' => $page->meta_og_title,
            'og_description' => $page->meta_og_description
        ]);

    }


    public function getProducts(){
        $colorIds = [];
        $attribute = Attribute::with(['options.translation'])->where('code','color')->first();
        foreach ($attribute->options as $option){
            $colorIds[] = $option->id;
        }

        $attribute_values = ProductAttributeValue::with(['product.translation','product.translation','product.latestImage','option.translation'])->where('attribute_id',$attribute->id)
            ->whereIn('integer_value',$colorIds)
            ->groupBy('integer_value')
            ->paginate(8);
        //dd($attribute_values);




        return $attribute_values;
    }


}
