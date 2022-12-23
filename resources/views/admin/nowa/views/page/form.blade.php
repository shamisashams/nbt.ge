
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

    <link rel="stylesheet" href="{{asset('admin/croppie/croppie.css')}}" />

@endsection

@section('content')

    <!-- breadcrumb -->
    <div class="breadcrumb-header justify-content-between">
        <div class="left-content">
            <span class="main-content-title mg-b-0 mg-b-lg-1">{{ __('admin.page-update')}}</span>
        </div>
        <div class="justify-content-center mt-2">
            @include('admin.nowa.views.layouts.components.breadcrump')
        </div>
    </div>
    <!-- /breadcrumb -->
    <input name="old-images[]" id="old_images" hidden disabled value="{{$page->files}}">
    <!-- row -->
    {!! Form::model($page,['url' => $url, 'method' => $method,'files' => true]) !!}
    <div class="row">
        <div class="col-lg-6 col-md-12">
            <div class="card">
                <div class="card-body">
                    <div>
                        <h6 class="card-title mb-1">@lang('admin.editpage')</h6>
                    </div>

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

                                    @foreach(config('translatable.locales') as $locale)

                                        <?php
                                        $active = '';
                                        if($loop->first) $active = 'active';
                                        ?>
                                        <div class="tab-pane {{$active}}" id="lang-{{$locale}}">
                                            <div class="main-content-label mg-b-5">
                                                @lang('admin.page_info')
                                            </div>
                                            <div class="form-group">
                                                {!! Form::label($locale.'[title]',__('admin.title'),['class' => 'form-label']) !!}
                                                {!! Form::text($locale.'[title]',$page->translate($locale)->title ?? '',['class' => 'form-control']) !!}

                                                @error($locale.'.title')
                                                <small class="text-danger">
                                                    <div class="error">
                                                        {{$message}}
                                                    </div>
                                                </small>
                                                @enderror
                                            </div>
                                            {{--<div class="form-group">
                                                {!! Form::label($locale.'[title_2]',__('admin.title_2'),['class' => 'form-label']) !!}
                                                {!! Form::text($locale.'[title_2]',$page->translate($locale)->title_2 ?? '',['class' => 'form-control']) !!}

                                                @error($locale.'.title_2')
                                                <small class="text-danger">
                                                    <div class="error">
                                                        {{$message}}
                                                    </div>
                                                </small>
                                                @enderror
                                            </div>--}}
                                            <div class="form-group">
                                                <label class="form-label" for="description">@lang('admin.description')</label>
                                                <textarea class="form-control" id="description-{{$locale}}"
                                                          name="{{$locale}}[description]'">
                                                {!! $page->translate($locale)->description ?? '' !!}
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
                                                <label class="form-label" for="description_2">@lang('admin.description_2')</label>
                                                <textarea class="form-control" id="description_2-{{$locale}}"
                                                          name="{{$locale}}[description_2]'">
                                                {!! $page->translate($locale)->description_2 ?? '' !!}
                                            </textarea>
                                                @error($locale.'.description_2')
                                                <small class="text-danger">
                                                    <div class="error">
                                                        {{$message}}
                                                    </div>
                                                </small>
                                                @enderror
                                            </div>--}}

                                            <div class="main-content-label mg-b-5 text-danger">
                                                @lang('admin.page_seo')
                                            </div>

                                            <div class="form-group">
                                                {!! Form::label($locale.'[meta_title]',__('admin.meta_title'),['class' => 'form-label']) !!}
                                                {!! Form::text($locale.'[meta_title]',$page->translate($locale)->meta_title ?? '',['class' => 'form-control']) !!}

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
                                                {!! Form::text($locale.'[meta_description]',$page->translate($locale)->meta_description ?? '',['class' => 'form-control']) !!}

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
                                                {!! Form::text($locale.'[meta_keyword]',$page->translate($locale)->meta_keyword ?? '',['class' => 'form-control']) !!}

                                                @error($locale.'.meta_keyword')
                                                <small class="text-danger">
                                                    <div class="error">
                                                        {{$message}}
                                                    </div>
                                                </small>
                                                @enderror
                                            </div>
                                            <div class="form-group">
                                                {!! Form::label($locale.'[meta_og_title]',__('admin.meta_og_title'),['class' => 'form-label']) !!}
                                                {!! Form::text($locale.'[meta_og_title]',$page->translate($locale)->meta_og_title ?? '',['class' => 'form-control']) !!}

                                                @error($locale.'.meta_og_title')
                                                <small class="text-danger">
                                                    <div class="error">
                                                        {{$message}}
                                                    </div>
                                                </small>
                                                @enderror
                                            </div>
                                            <div class="form-group">
                                                {!! Form::label($locale.'[meta_og_description]',__('admin.meta_og_description'),['class' => 'form-label']) !!}
                                                {!! Form::text($locale.'[meta_og_description]',$page->translate($locale)->meta_og_description ?? '',['class' => 'form-control']) !!}

                                                @error($locale.'.meta_og_description')
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


                    <div class="form-group">
                        <label class="form-label">@lang('admin.css')</label>
                        <textarea style="font-size: 12px" rows="20" name="css" class="form-control">{{$page->css??old('css')}}</textarea>

                    </div>


                    <div class="form-group mb-0 mt-3 justify-content-end">
                        <div>
                            {!! Form::submit(__('admin.update'),['class' => 'btn btn-primary']) !!}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>

    <!-- /row -->
    <!-- row -->



    <div class="row">
        <div class="col-lg-12 col-md-12">
            <div class="card">
                <div class="card-body">
                    <div>
                        <h6 class="card-title mb-1">@lang('admin.sections')</h6>
                    </div>
                    @foreach($page->sections as $item)

                        {{--@if($page->key == 'home')
                            <div class="form-group">
                                <label class="form-label">@lang('admin.link')</label>
                                <input class="form-control" type="text" name="section[{{$item->id}}][link]" value="{{$item->link}}">

                            </div>

                            <div class="form-group">
                                <label class="form-label">@lang('admin.bg_color')</label>
                                <input class="form-control" name="section[{{$item->id}}][bg_color]" value="{{$item->bg_color}}" data-jscolor="{}">
                            </div>

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

                                                    <li><a href="#slang-{{$locale}}" class="nav-link {{$active}}" data-bs-toggle="tab">{{$locale}}</a></li>
                                                @endforeach

                                            </ul>
                                        </div>
                                    </div>
                                    <div class="panel-body tabs-menu-body main-content-body-right border">
                                        <div class="tab-content">

                                            @foreach(config('translatable.locales') as $locale)

                                                <?php
                                                $active = '';
                                                if($loop->first) $active = 'active';
                                                ?>
                                                <div class="tab-pane {{$active}}" id="slang-{{$locale}}">

                                                    <div class="form-group">
                                                        <label class="form-label">@lang('admin.title')</label>

                                                        <input class="form-control" type="text" name="section[{{$item->id}}][{{$locale}}][title]" value="{{$item->translate($locale)->title ?? ''}}">


                                                        @error('title.'. $item->id . '.' . $locale . '.title')
                                                        <small class="text-danger">
                                                            <div class="error">
                                                                {{$message}}
                                                            </div>
                                                        </small>
                                                        @enderror
                                                    </div>
                                                    <div class="form-group">
                                                        <label class="form-label">@lang('admin.text')</label>

                                                        <textarea class="form-control" name="section[{{$item->id}}][{{$locale}}][text]">{{$item->translate($locale)->text ?? ''}}</textarea>

                                                        @error('text.'. $item->id . '.' . $locale . '.text')
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

                        @endif--}}
                        <div class="form-group">

                            <!-- /row -->
                            <div class="row">
                                <div class="col-lg-12 col-md-12">
                                    <div class="card">
                                        <div class="card-body">
                                            <div>
                                                <h6 class="card-title mb-1">@lang('admin.product_image_crop_upload')</h6>
                                            </div>
                                            <div id="img_list_{{$item->id}}">
                                                <p>Select a image file to crop</p>
                                                <input type="file" class="inputFile" data-id="{{$item->id}}" id="inputFile_{{$item->id}}" accept="image/png, image/jpeg">
                                            </div>
                                            <div id="actions_{{$item->id}}" style="display: none;">
                                                <button class="cropBtn" id="cropBtn_{{$item->id}}" type="button">Crop </button>
                                            </div>
                                            <div id="croppieMount_{{$item->id}}" class="p-relative"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!-- row -->


                            <input type="file" class="dropify" name="image[{{$item->id}}]" data-default-file="{{($item->file) ? asset($item->file->getFileUrlAttribute()) : ''}}" data-height="200"  />

                        </div>
                    @endforeach
                </div>
            </div>
        </div>
    </div>


    {{--@if($page->key == 'about')

        <div class="row">
            <div class="col-lg-12 col-md-12">
                <div class="card">
                    <div class="card-body">
                        <div>
                            <h6 class="card-title mb-1">Gallery</h6>
                        </div>
                        <div class="form-group">
                            <label class="ckbox">
                                <input type="checkbox" name="images"
                                       value="true" {{$page->images ? 'checked' : ''}}>
                                <span>{{__('admin.status')}}</span>
                            </label>
                        </div>
                        <div class="input-images"></div>
                        @if ($errors->has('images'))
                            <span class="help-block">
                                            {{ $errors->first('images') }}
                                        </span>
                        @endif
                    </div>
                </div>
            </div>
        </div>

    @endif--}}



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
    <script src="{{asset('admin/assets/jscolor/jscolor.js')}}"></script>

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
                preloaded: imagedata,
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

    <script src="{{asset('admin/croppie/croppie.js')}}"></script>
    <script>

        $('.inputFile').change(function (event){
            let id = $(this).data('id');
            //alert(id);

            let croppie = null;
            let croppieMount = document.getElementById('croppieMount_' + id);

            let cropBtn = document.getElementById('cropBtn_' + id);

            let inputFile = document.getElementById('inputFile_' + id);

            let actions = document.getElementById('actions_' + id);

            function cleanUpCroppie() {
                croppieMount.innerHTML = '';
                croppieMount.classList.remove('croppie-container');

                croppie = null;
            }


            cleanUpCroppie();

            // Our input file
            let file = event.target.files[0];

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
                    formData.append('id', id);
                    formData.append('base64_img', imageResult);
                    formData.append('_token', '{{csrf_token()}}');

                    //document.getElementById('inp_crop_img').value = imageResult;
                    // Sends a POST request to upload_cropped.php

                    console.log(formData);
                    /*fetch('', {
                        method: 'POST',
                        body: formData
                    }).then((data) => {
                        //console.log(data.text());
                        location.reload()
                    });*/
                    croppie.destroy();
                    $('#img_list_' + id).html('<span class="img_itm"><input type="hidden" name="base64_img[' + id + ']" value="' + imageResult + '"><img height="200" src="' + imageResult + '"><a class="delete_img" href="javascript:;">delete</a><span>');
                    alert('cropped')

                });
            });
        });







        $('[data-rm_img]').click(function (e){
            $(this).parents('.uploaded-image').remove();
        })

        $(document).on('click','.delete_img',function (e){
            $(this).parents('.img_itm').remove();
        });
    </script>

@endsection
