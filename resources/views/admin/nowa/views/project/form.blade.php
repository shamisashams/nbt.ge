<?php



?>
@extends('admin.nowa.views.layouts.app')

@section('styles')

    <!--- Internal Select2 css-->
    <link href="{{asset('assets/plugins/select2/css/select2.min.css')}}" rel="stylesheet">

    <!---Internal Fileupload css-->
    <link href="{{asset('assets/plugins/fileuploads/css/fileupload.css')}}" rel="stylesheet" type="text/css"/>

    <!---Internal Fancy uploader css-->
    <link href="{{asset('assets/plugins/fancyuploder/fancy_fileupload.css')}}" rel="stylesheet" />

    <!--Internal Sumoselect css-->
    <link rel="stylesheet" href="{{asset('assets/plugins/sumoselect/sumoselect.css')}}">

    <!--Internal  TelephoneInput css-->
    <link rel="stylesheet" href="{{asset('assets/plugins/telephoneinput/telephoneinput.css')}}">

    <link rel="stylesheet" href="{{asset('uploader/image-uploader.css')}}">
    <!--  smart photo master css -->
    <link href="{{asset('assets/plugins/SmartPhoto-master/smartphoto.css')}}" rel="stylesheet">

    <link rel="stylesheet" href="{{asset('admin/croppie/croppie.css')}}" />

@endsection

@section('content')

    <!-- breadcrumb -->
    <div class="breadcrumb-header justify-content-between">
        <div class="left-content">
            <span class="main-content-title mg-b-0 mg-b-lg-1">{{$model->created_at ? __('admin.project-update') : __('admin.project-create')}}</span>
        </div>
        <div class="justify-content-center mt-2">
            @include('admin.nowa.views.layouts.components.breadcrump')
        </div>
    </div>
    <!-- /breadcrumb -->
    <input name="old-images[]" id="old_images" hidden disabled value="{{$model->files}}">
    <!-- row -->
    {!! Form::model($model,['url' => $url, 'method' => $method,'files' => true]) !!}
    <div class="row">
        <div class="col-lg-6 col-md-12">
            <div class="card">
                <div class="card-body">

                    <div class="mb-4">


                        <div class="panel panel-primary tabs-style-2">
                            <div class=" tab-menu-heading">
                                <div class="tabs-menu1">
                                    <!-- Tabs -->
                                    <ul class="nav panel-tabs main-nav-line">
                                        @foreach(config('translatable.locales') as $locale)
                                            <?php
                                            $active = '';
                                            if($loop->first) $active = 'active';
                                            ?>

                                            <li><a href="#lang-{{$locale}}" class="nav-link {{$active}}" data-bs-toggle="tab">{{$locale}}</a></li>
                                        @endforeach

                                    </ul>
                                </div>
                            </div>
                            <div class="panel-body tabs-menu-body main-content-body-right border">
                                <div class="tab-content">
                                    <div class="main-content-label mg-b-5">
                                    @lang('admin.translatable')
                                    </div>
                                    @foreach(config('translatable.locales') as $locale)

                                        <?php
                                        $active = '';
                                        if($loop->first) $active = 'active';
                                        ?>
                                        <div class="tab-pane {{$active}}" id="lang-{{$locale}}">
                                            <div class="form-group">
                                                <label class="form-label">@lang('admin.title')</label>
                                                <input type="text" name="{{$locale.'[title]'}}" class="form-control" placeholder="Name" value="{{$model->translate($locale)->title ?? ''}}">
                                                @error($locale.'.title')
                                                <small class="text-danger">
                                                    <div class="error">
                                                        {{$message}}
                                                    </div>
                                                </small>
                                                @enderror
                                            </div>

                                            <div class="form-group">
                                                {!! Form::label($locale.'[customer_title]',__('admin.customer'),['class' => 'form-label']) !!}
                                                {!! Form::text($locale.'[customer_title]',$model->translate($locale)->customer_title ?? '',['class' => 'form-control']) !!}

                                                @error($locale.'.customer_title')
                                                <small class="text-danger">
                                                    <div class="error">
                                                        {{$message}}
                                                    </div>
                                                </small>
                                                @enderror
                                            </div>

                                            <div class="form-group">
                                                <label class="form-label" for="description">@lang('admin.description')</label>
                                                <textarea class="form-control" id="description-{{$locale}}"
                                                          name="{{$locale}}[description]'">
                                                    {!! $model->translate($locale)->description ?? '' !!}
                                                </textarea>
                                                @error($locale.'.description')
                                                <small class="text-danger">
                                                    <div class="error">
                                                        {{$message}}
                                                    </div>
                                                </small>
                                                @enderror
                                            </div>


                                            {{--<div class="form-group">
                                                <label class="form-label" for="address">@lang('admin.address')</label>
                                                <textarea class="form-control" id="address-{{$locale}}"
                                                          name="{{$locale}}[address]'">{!! $model->translate($locale)->address ?? '' !!}</textarea>
                                                @error($locale.'.address')
                                                <small class="text-danger">
                                                    <div class="error">
                                                        {{$message}}
                                                    </div>
                                                </small>
                                                @enderror
                                            </div>--}}

                                            <div class="main-content-label mg-b-5 text-danger">
                                            @lang('admin.product_seo')
                                            </div>
                                            <div class="form-group">
                                                {!! Form::label($locale.'[meta_title]',__('admin.meta_title'),['class' => 'form-label']) !!}
                                                {!! Form::text($locale.'[meta_title]',$model->translate($locale)->meta_title ?? '',['class' => 'form-control']) !!}

                                                @error($locale.'.meta_title')
                                                <small class="text-danger">
                                                    <div class="error">
                                                        {{$message}}
                                                    </div>
                                                </small>
                                                @enderror
                                            </div>
                                            <div class="form-group">
                                                {!! Form::label($locale.'[meta_description]',__('admin.meta_description'),['class' => 'form-label']) !!}
                                                {!! Form::text($locale.'[meta_description]',$model->translate($locale)->meta_keyword ?? '',['class' => 'form-control']) !!}

                                                @error($locale.'.meta_description')
                                                <small class="text-danger">
                                                    <div class="error">
                                                        {{$message}}
                                                    </div>
                                                </small>
                                                @enderror
                                            </div>
                                            <div class="form-group">
                                                {!! Form::label($locale.'[meta_keyword]',__('admin.meta_keyword'),['class' => 'form-label']) !!}
                                                {!! Form::text($locale.'[meta_keyword]',$model->translate($locale)->meta_description ?? '',['class' => 'form-control']) !!}

                                                @error($locale.'.meta_keyword')
                                                <small class="text-danger">
                                                    <div class="error">
                                                        {{$message}}
                                                    </div>
                                                </small>
                                                @enderror
                                            </div>




                                        </div>

                                    @endforeach

                                </div>
                            </div>
                        </div>

                    </div>


                </div>
            </div>
        </div>
        <div class="col-lg-6 col-md-12">
            <div class="card">
                <div class="card-body">


                    <div>
                        <h6 class="card-title mb-1">@lang('admin.products')</h6>
                    </div>
                    <?php
                    $ids = $model->products->pluck("id")->toArray();
                    ?>
                    <div class="mb-4">
                        @foreach($products as $product)
                            <div class="form-group">
                                <label class="ckbox">
                                    <input type="checkbox" name="product[]" data-checkboxes="mygroup" class="custom-control-input"  id="{{$product->id}}" value="{{$product->id}}" {{in_array($product->id,$ids) ? 'checked' : ''}}>
                                    <span style="margin-left: 5px">{{$product->title}}</span>

                                </label>
                            </div>
                        @endforeach
                    </div>


                    <div>
                        <h6 class="card-title mb-1">@lang('admin.params')</h6>
                    </div>


                    <div class="form-group">
                        {!! Form::label('slug',__('admin.slug'),['class' => 'form-label']) !!}
                        <input type="text" name="slug" class="form-control" placeholder="@lang('admin.slug')" value="{{$model->slug ?? old('slug')}}">
                        @error('slug')
                        <small class="text-danger">
                            <div class="error">
                                {{$message}}
                            </div>
                        </small>
                        @enderror
                    </div>





                    <div class="form-group">
                        <label class="ckbox">
                            <input type="checkbox" name="status"
                                   value="true" {{$model->status ? 'checked' : ''}}>
                            <span>{{__('admin.status')}}</span>
                        </label>
                    </div>



                    <div class="form-group">

                        <label class="rdiobox"><input {{$model->is_commercial?'checked':''}} name="is_commercial" type="radio" value="1"> <span>@lang('admin.commercial')</span></label>
                        <label class="rdiobox"><input {{!$model->is_commercial?'checked':''}} name="is_commercial" type="radio" value="0"> <span>@lang('admin.individual')</span></label>

                    </div>





                    <div class="form-group mb-0 mt-3 justify-content-end">
                        <div>
                            {!! Form::submit($model->created_at ? __('admin.update') : __('admin.create'),['class' => 'btn btn-primary']) !!}
                        </div>
                    </div>



                </div>
            </div>
        </div>
    </div>

    <!-- /row -->

    <div class="row">
        <div class="col-lg-12 col-md-12">
            <div class="card">
                <div class="card-body">
                    <div>
                        <h6 class="card-title mb-1">@lang('admin.product_image_crop_upload')</h6>
                    </div>
                    <div>
                        <p>Select a image file to crop</p>
                        <input type="file" id="inputFile" accept="image/png, image/jpeg">
                    </div>
                    <div id="actions" style="display: none;">
                        <button id="cropBtn" type="button">Crop {{--@if($product->created_at)& Upload @endif--}}</button>
                    </div>
                    <div id="croppieMount" class="p-relative"></div>
                </div>
            </div>
        </div>
    </div>
    <!-- row -->
    <div class="row">
        <div class="col-lg-12 col-md-12">
            <div class="card">
                <div class="card-body">
                    <div>
                        <h6 class="card-title mb-1">@lang('admin.prouctimages')</h6>
                    </div>
                    <div class="input-images"></div>
                    @if ($errors->has('images'))
                        <span class="help-block">
                                            {{ $errors->first('images') }}
                                        </span>
                    @endif



                    <div class="image-uploader">
                        <div class="uploaded">
                            <div id="img_list">
                                @if(old('base64_img'))
                                    <span class="img_itm"><input type="hidden" name="base64_img" value="{{old('base64_img')}}"><img height="200" src="{{old('base64_img')}}"><a class="delete_img" href="javascript:;">delete</a><span>

                                @endif
                            </div>
                            @foreach($model->files as $item)

                                    <div class="uploaded-image">

                                        <img src="{{asset($item->getFileUrlAttribute())}}" alt="" />

                                        <div style="position: absolute;z-index: 10;background-color: #fff">
                                            <input type="hidden" name="old_images[]"  value="{{$item->id}}">
                                            <label class="rdiobox"><input name="main" value="{{$item->id}}" name="rdio" type="radio" {{$item->main ? 'checked':''}}> <span>Main</span></label>
                                            <label class="ckbox"><input name="cover[]" value="{{$item->id}}" type="checkbox" {{$item->cover ? 'checked':''}}><span>Cover</span></label>
                                            <button type="button" class="btn" data-rm_img="{{$item->id}}">remove</button>
                                        </div>
                                    </div>



                            @endforeach
                        </div>
                    </div>


                </div>
            </div>
        </div>
    </div>
    <!-- row closed -->

    <!-- /row -->

    <!-- row -->

    <!-- row closed -->
    {!! Form::close() !!}

@endsection

@section('scripts')

    <!--Internal  Datepicker js -->
    <script src="{{asset('assets/plugins/jquery-ui/ui/widgets/datepicker.js')}}"></script>

    <!-- Internal Select2 js-->
    <script src="{{asset('assets/plugins/select2/js/select2.min.js')}}"></script>

    <!--Internal Fileuploads js-->
    <script src="{{asset('assets/plugins/fileuploads/js/fileupload.js')}}"></script>
    <script src="{{asset('assets/plugins/fileuploads/js/file-upload.js')}}"></script>

    <!--Internal Fancy uploader js-->
    <script src="{{asset('assets/plugins/fancyuploder/jquery.ui.widget.js')}}"></script>
    <script src="{{asset('assets/plugins/fancyuploder/jquery.fileupload.js')}}"></script>
    <script src="{{asset('assets/plugins/fancyuploder/jquery.iframe-transport.js')}}"></script>
    <script src="{{asset('assets/plugins/fancyuploder/jquery.fancy-fileupload.js')}}"></script>
    <script src="{{asset('assets/plugins/fancyuploder/fancy-uploader.js')}}"></script>

    <!--Internal  Form-elements js-->
    <script src="{{asset('assets/js/advanced-form-elements.js')}}"></script>
    <script src="{{asset('assets/js/select2.js')}}"></script>

    <!--Internal Sumoselect js-->
    <script src="{{asset('assets/plugins/sumoselect/jquery.sumoselect.js')}}"></script>

    <!-- Internal TelephoneInput js-->
    <script src="{{asset('assets/plugins/telephoneinput/telephoneinput.js')}}"></script>
    <script src="{{asset('assets/plugins/telephoneinput/inttelephoneinput.js')}}"></script>

    <script src="{{asset('uploader/image-uploader.js')}}"></script>

    <!-- smart photo master js -->
    <script src="{{asset('assets/plugins/SmartPhoto-master/smartphoto.js')}}"></script>
    <script src="{{asset('assets/js/gallery.js')}}"></script>

    <script>
        let oldImages = $('#old_images').val();
        if (oldImages) {
            oldImages = JSON.parse(oldImages);
        }
        let imagedata = [];
        let getUrl = window.location;
        let baseUrl = getUrl.protocol + "//" + getUrl.host + "/" + getUrl.pathname.split('/')[0];
        if (oldImages && oldImages.length > 0) {
            oldImages.forEach((el, key) => {
                let directory = '';
                if (el.fileable_type === 'App\\Models\\Project') {
                    directory = 'project';
                }
                imagedata.push({
                    id: el.id,
                    src: `${baseUrl}${el.path}/${el.title}`
                })
            })
            $('.input-images').imageUploader({
                //preloaded: imagedata,
                imagesInputName: 'images',
                preloadedInputName: 'old_images'
            });
        } else {
            $('.input-images').imageUploader();
        }
    </script>

    <script src="{{ asset('ckeditor/ckeditor.js') }}"></script>
    <script>
        @foreach(config('translatable.locales') as $locale)
        CKEDITOR.replace('description-{{$locale}}', {
            filebrowserUploadUrl: "{{route('upload', ['_token' => csrf_token() ])}}",
            filebrowserUploadMethod: 'form'
        });
        @endforeach
    </script>

    <script>
        $('[name="categories[]"]').click(function (e){
            let $this = $(this);


                let next = $this.closest('li').next('li');
                //console.log(next);
                if(next.hasClass('child')){
                    if($this.is(':checked')){

                        next.find('input[type=checkbox]').prop('checked',true);
                    } else {
                        next.find('input[type=checkbox]').prop('checked',false);
                    }
                }

                if($this.parents('li').hasClass('child')){

                    if($this.is(':checked')){

                        $this.parents('.child').prev('li').find('input[type=checkbox]').prop('checked',true);
                        //$this.parents('.child').find('input[type=checkbox]').prop('checked',true);
                    } else {
                        //$this.parents('.child').find('input[type=checkbox]').prop('checked',false);
                        $this.parents('.child').prev('li').find('input[type=checkbox]').prop('checked',false);
                    }
                }


        });

        $('.bool_ckbox').click(function (e){
            if($(this).is(':checked')){
                $(this).prev('input[type=hidden]').val(1);
            } else $(this).prev('input[type=hidden]').val(0);
        });

        $('[data-rm_img]').click(function (e){
            $(this).parents('.uploaded-image').remove();
        })

        <?php
        $result = [];
        foreach ($districts as $district){
            $result[$district->city_id][] = $district;
        }
        ?>

        let districts = @json($result);
        let project = @json($model);

        console.log(districts,project);

        $('[name="city_id"]').change(function (e){
            let city_id = $(this).val();
            //alert(city_id);
            $('[name="district_id"]').html('<option value=""></option>');

            if(typeof districts[city_id] !== 'undefined'){
                //console.log(districts[city_id]);
                districts[city_id].map(function (el,i){
                    $('[name="district_id"]').append(`<option value="${el.id}">${el.title}</option>`)
                });
            }

        });

        $('[name="city_id"]').val(project.city_id);
        if(project.city_id > 0){
            $('[name="district_id"]').html('<option value=""></option>');

            if(typeof districts[project.city_id] !== 'undefined'){
                //console.log(districts[city_id]);
                districts[project.city_id].map(function (el,i){
                    $('[name="district_id"]').append(`<option value="${el.id}">${el.title}</option>`)
                });
            }
            $('[name="district_id"]').val(project.district_id);
        }
    </script>


    <script src="{{asset('admin/croppie/croppie.js')}}"></script>
    <script>


        let croppie = null;
        let croppieMount = document.getElementById('croppieMount');

        let cropBtn = document.getElementById('cropBtn');

        let inputFile = document.getElementById('inputFile');

        let actions = document.getElementById('actions');

        function cleanUpCroppie() {
            croppieMount.innerHTML = '';
            croppieMount.classList.remove('croppie-container');

            croppie = null;
        }

        inputFile.addEventListener('change', () => {
            cleanUpCroppie();

            // Our input file
            let file = inputFile.files[0];

            let reader = new FileReader();
            reader.onloadend = function(event) {
                // Get the data url of the file
                const data = event.target.result;

                // ...
            }

            reader.readAsDataURL(file);

            reader.onloadend = function(event) {
                // Get the data ulr of the file
                const data = event.target.result;
                let width = screen.width;

                croppie = new Croppie(croppieMount, {
                    url: data,
                    viewport: {
                        width: width * 0.8,
                        height: 500,

                    },
                    boundary: {
                        width: width * 0.8,
                        height: 700
                    },
                    mouseWheelZoom: false,
                    enableResize: true,
                });

                // Binds the image to croppie
                croppie.bind();

                // Unhide the `actions` div element
                actions.style.display = 'block';
            }
        })


        cropBtn.addEventListener('click', () => {
            // Get the cropped image result from croppie
            croppie.result({
                type: 'base64',
                circle: false,
                format: 'png',
                size: 'original'
            }).then((imageResult) => {
                // Initialises a FormData object and appends the base64 image data to it
                let formData = new FormData();
                formData.append('base64_img', imageResult);
                formData.append('_token', '{{csrf_token()}}');

                //document.getElementById('inp_crop_img').value = imageResult;
                // Sends a POST request to upload_cropped.php
                {{--@if($product->created_at)
                fetch('{{route('product.crop-upload',$product)}}', {
                    method: 'POST',
                    body: formData
                }).then(() => {
                    location.reload()
                });
                @else--}}
                croppie.destroy();
                $('#img_list').html('<span class="img_itm"><input type="hidden" name="base64_img" value="' + imageResult + '"><img height="200" src="' + imageResult + '"><a class="delete_img" href="javascript:;">delete</a><span>');
                alert('cropped')
                {{--@endif--}}
            });
        });



        $(document).on('click','.delete_img',function (e){
            $(this).parents('.img_itm').remove();
        });
    </script>

@endsection
