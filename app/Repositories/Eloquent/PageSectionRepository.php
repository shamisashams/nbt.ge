<?php
/**
 *  app/Repositories/Eloquent/ProductRepository.php
 *
 * Date-Time: 30.07.21
 * Time: 10:36
 * @author Insite LLC <hello@insite.international>
 */

namespace App\Repositories\Eloquent;


use App\Models\File;
use App\Models\PageSection;
use App\Repositories\Eloquent\Base\BaseRepository;
use App\Repositories\PageSectionRepositoryInterface;
use Gumlet\ImageResize;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;
use ReflectionClass;

/**
 * Class LanguageRepository
 * @package App\Repositories\Eloquent
 */
class PageSectionRepository extends BaseRepository implements PageSectionRepositoryInterface
{
    /**
     * @param \App\Models\Product $model
     */
    public function __construct(PageSection $model)
    {
        parent::__construct($model);
    }


    public function saveFile(int $id, $request, $height = 800, $width = 800): Model
    {
        //dd($request->file('image'));


        if($request->hasFile('image')){
            foreach ($request->file('image') as $key => $file){
                $model = $this->model->where('id',$key)->first();
                $reflection = new ReflectionClass(get_class($model));
                $modelName = $reflection->getShortName();
                if ($model->file){
                    Storage::delete('public/' . $modelName .'/' . $model->id . '/' . $model->file->title);
                    Storage::delete('public/' . $modelName .'/' . $model->id . '/thumb/' . $model->file->title);
                    $model->file->delete();
                }


            }
        }




        if ($request->hasFile('image')) {
            // Get Name Of model


            //dd($modelName);

            foreach ($request->file('image') as $key => $file) {
                $model = $this->model->where('id',$key)->first();
                $reflection = new ReflectionClass(get_class($model));
                $modelName = $reflection->getShortName();
                $image = new ImageResize($file);
                $image->resizeToHeight($height);

                //$image->crop($width, $height, false, ImageResize::CROPCENTER);
                //$image->save(date('Ymhs') . $file->getClientOriginalName());
                $img = $image->getImageAsString();

                $imagename = date('Ymhs') . str_replace(' ', '', $file->getClientOriginalName());
                $destination = base_path() . '/storage/app/public/' . $modelName . '/' . $key;

                $thumb = 'public/' . $modelName . '/' . $model->id .'/thumb/'.$imagename;

                $request->file('image')[$key]->move($destination, $imagename);

                Storage::put($thumb,$img);

                $model = $this->model->where('id',$key)->first();
                $model->file()->create([
                    'title' => $imagename,
                    'path' => 'storage/' . $modelName . '/' . $key,
                    'format' => $file->getClientOriginalExtension(),
                    'type' => File::FILE_DEFAULT
                ]);
            }
        }

        return $this->model;
    }


    public function saveFile2(int $id, $base64,$height = 800, $width = 800): Model
    {
        //dd($request->file('image'));
        $this->model = $this->findOrFail($id);
        $reflection = new ReflectionClass(get_class($this->model));
        $modelName = $reflection->getShortName();

        //dd($this->model->files);
        foreach ($this->model->files as $file){
            Storage::delete('public/' . $modelName .'/' . $this->model->id . '/' . $file->title);
            Storage::delete('public/' . $modelName .'/' . $this->model->id . '/thumb/' . $file->title);
            $file->delete();
        }



        $data = explode(',', $base64);
// Decode the base64 data
        $data = base64_decode($data[1]);



        if ($base64) {
            // Get Name Of model



            $imagename = date('Ymdhis') .'crop.png';
            $destination = base_path() . '/storage/app/public/' . $modelName . '/' . $this->model->id;

            $image =  ImageResize::createFromString($data);
            $image->resizeToHeight($height);

            //$image->crop($width, $height, false, ImageResize::CROPCENTER);
            //$image->save(date('Ymhs') . $file->getClientOriginalName());
            $img = $image->getImageAsString();

            $thumb = 'public/' . $modelName . '/' . $this->model->id .'/thumb/'.$imagename;

            Storage::put('public/' . $modelName . '/' . $this->model->id . '/' . $imagename,$data);

            Storage::put($thumb,$img);

            $this->model->files()->create([
                'title' => $imagename,
                'path' => 'storage/' . $modelName . '/' . $this->model->id,
                'format' => 'png',
                'type' => File::FILE_DEFAULT,
            ]);

        }
        return $this->model;
    }

}
