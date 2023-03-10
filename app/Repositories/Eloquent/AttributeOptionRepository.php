<?php
/**
 *  app/Repositories/Eloquent/ProductRepository.php
 *
 * Date-Time: 30.07.21
 * Time: 10:36
 * @author Insite LLC <hello@insite.international>
 */

namespace App\Repositories\Eloquent;



use App\Models\AttributeOption;
use App\Repositories\Eloquent\Base\BaseRepository;
use App\Repositories\AttributeOptionRepositoryInterface;
use Gumlet\ImageResize;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;


/**
 * Class LanguageRepository
 * @package App\Repositories\Eloquent
 */
class AttributeOptionRepository extends BaseRepository implements AttributeOptionRepositoryInterface
{

    /**
     * @param \App\Models\Product $model
     */
    public function __construct(AttributeOption $model)
    {
        parent::__construct($model);

    }

    public function saveImage($id,$file,$height = 200){
        $this->model = $this->findOrFail($id);
        $filename = uniqid();
        $path = $file->storePubliclyAs(
            'options/'.$id, $filename.'.'.$file->getClientOriginalExtension(),'public'
        );


        $image = new ImageResize($file);
        $image->resizeToHeight($height);
        $img = $image->getImageAsString();

        $thumb = 'public/options/' . $id .'/thumb/'.$filename.'.'.$file->getClientOriginalExtension();
        Storage::put($thumb,$img);


        $this->model->update(['image' => $path]);
    }


}
