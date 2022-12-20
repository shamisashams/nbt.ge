<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use App\Models\Certificate;
use App\Models\Page;
use App\Models\Project;
use http\Env\Request;
use Inertia\Inertia;
use App\Repositories\Eloquent\GalleryRepository;

class ProjectController extends Controller
{
    protected $galleryRepository;

    public function __construct(GalleryRepository $galleryRepository){
        $this->galleryRepository = $galleryRepository;
    }

    public function index()
    {
        $page = Page::where('key', 'about')->firstOrFail();

        $images = [];
        foreach ($page->sections as $sections){
            if($sections->file){
                $images[] = asset($sections->file->getFileUrlAttribute());
            } else {
                $images[] = null;
            }

        }

        $files = [];
        if($page->images) $files = $page->files;

        //dd($files);

        return Inertia::render('Projects', ["page" => $page, "seo" => [
            "title"=>$page->meta_title,
            "description"=>$page->meta_description,
            "keywords"=>$page->meta_keyword,
            "og_title"=>$page->meta_og_title,
            "og_description"=>$page->meta_og_description,
//            "image" => "imgg",
//            "locale" => App::getLocale()
        ], 'gallery_img' => $files,'images' => $images])->withViewData([
            'meta_title' => $page->meta_title,
            'meta_description' => $page->meta_description,
            'meta_keyword' => $page->meta_keyword,
            "image" => $page->file,
            'og_title' => $page->meta_og_title,
            'og_description' => $page->meta_og_description
        ]);
    }

    public function show(string $locale, string $slug)
    {
        //\Illuminate\Support\Facades\DB::enableQueryLog();


        $project = Project::query()->where('slug',$slug)->where('status',1)->with(['translation','latestImage','products.attribute_values.attribute.translation','products.attribute_values.option.translation','files','products.latestImage'])->firstOrFail();


        $products = [];
        foreach ($project->products as $_product){
            $product_attributes = $_product->attribute_values;

            $_result = [];

            foreach ($product_attributes as $item){

                if($item->attribute->type == 'select'){

                    $_result[$item->attribute->code] = $item->attribute->code == 'size' ? $item->option->value : $item->option->label;


                }
            }
            $_product['attributes'] = $_result;

            $_result = [];
            foreach ($_product->categories as $category){
                if ($category->isRoot()) $_result = $category->id;
            }
            $_product['category'] = $_result;
            $products[$_product['category']][] = $_product;
        }

        //dd($flat_count['flat_count']);
        //dd($products);




        return Inertia::render('SingleProject',[
            'products' => $products,
            'similar_products' => null,
            'product_images' => null,
            'product_attributes' => null,
            'project' => $project,
            "seo" => [
                "title"=>$project->meta_title,
                "description"=>$project->meta_description,
                "keywords"=>$project->meta_keyword,
                "og_title"=>$project->meta_title,
                "og_description"=>$project->meta_description,
                "image" => $project->latestImage ? $project->latestImage->file_full_url : '',
//            "locale" => App::getLocale()
            ]
        ])->withViewData([
            'meta_title' => $project->meta_title,
            'meta_description' => $project->meta_description,
            'meta_keyword' => $project->meta_keyword,
            "image" => $project->latestImage ? $project->latestImage->file_full_url : '',
            'og_title' => $project->meta_title,
            'og_description' => $project->meta_description,
        ]);
    }

    public function getAllProjects(\Illuminate\Http\Request $request, $locale,$type = null){
        $query = Project::with(['translation','latestImage','products.attribute_values.attribute.translation','products.attribute_values.option.translation','products.categories.translation']);
        if($type == 'commercial') {
            $query->where('is_commercial',1);
        }

        if($type == 'individual') {
            $query->where('is_commercial',0);
        }
        $projects = $query->paginate(4);

        //dd($projects);
        foreach ($projects as $project){
            foreach ($project->products as $_product){
                $product_attributes = $_product->attribute_values;

                $_result = [];

                foreach ($product_attributes as $item){

                    if($item->attribute->type == 'select'){

                        $_result[$item->attribute->code] = $item->attribute->code == 'size' ? $item->option->value : $item->option->label;


                    }
                }
                $_product['attributes'] = $_result;

                $_result = [];
                foreach ($_product->categories as $category){
                    if ($category->isRoot()) $_result = $category->id;
                }
                $_product['category'] = $_result;
            }



        }

        return $projects;
    }
}
