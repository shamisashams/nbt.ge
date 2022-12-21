<?php
/**
 *  routes/web.php
 *
 * Date-Time: 03.06.21
 * Time: 15:41
 * @author Insite LLC <hello@insite.international>
 */

use App\Http\Controllers\Admin\Auth\LoginController;
use App\Http\Controllers\Admin\GalleryController;
use App\Http\Controllers\Admin\LanguageController;
use App\Http\Controllers\Admin\PageController;
use App\Http\Controllers\Admin\SettingController;
use App\Http\Controllers\Admin\SliderController;
use App\Http\Controllers\Admin\TranslationController;
use App\Http\Controllers\CKEditorController;
use App\Http\Controllers\Client\HomeController;
use App\Http\Controllers\Client\ContactController;
use App\Http\Controllers\Client\AboutUsController;
use Illuminate\Support\Facades\Route;
use Laravel\Socialite\Facades\Socialite;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Foundation\Auth\EmailVerificationRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Password;
use Illuminate\Auth\Events\PasswordReset;
use Illuminate\Support\Facades\Hash;

Route::post('ckeditor/image_upload', [CKEditorController::class, 'upload'])->withoutMiddleware('web')->name('upload');





Route::redirect('', config('translatable.fallback_locale'));
Route::prefix('{locale?}')
    ->group(function () {
        Route::prefix('adminpanel')->group(function () {
            Route::get('login', [LoginController::class, 'loginView'])->name('loginView');
            Route::post('login', [LoginController::class, 'login'])->name('login');


            Route::middleware(['auth','is_admin'])->group(function () {
                Route::get('logout', [LoginController::class, 'logout'])->name('logout');

                Route::redirect('', 'adminpanel/category');

                // Language
                Route::resource('language', LanguageController::class);
                Route::get('language/{language}/destroy', [LanguageController::class, 'destroy'])->name('language.destroy');

                // Translation
                Route::resource('translation', TranslationController::class);

                // Category
                Route::resource('category', \App\Http\Controllers\Admin\CategoryController::class);
                Route::get('category/{category}/destroy', [\App\Http\Controllers\Admin\CategoryController::class, 'destroy'])->name('category.destroy');
                Route::get('category/{category}/add_color',[\App\Http\Controllers\Admin\CategoryController::class,'addColor'])->name('category.add-color');
                Route::post('category/{category}/store_color',[\App\Http\Controllers\Admin\CategoryController::class,'storeColor'])->name('category.store_color');
                Route::get('category/{category}/{category_color}/edit_color',[\App\Http\Controllers\Admin\CategoryController::class,'editColor'])->name('category.edit_color');
                Route::put('category/{category}/{category_color}/update_color',[\App\Http\Controllers\Admin\CategoryController::class,'updateColor'])->name('category.update_color');
                Route::get('category/{category}/{category_color}/delete_color',[\App\Http\Controllers\Admin\CategoryController::class,'deleteColor'])->name('category.delete_color');
//
                // Product
                Route::resource('product', \App\Http\Controllers\Admin\ProductController::class);
                Route::get('product/{product}/destroy', [\App\Http\Controllers\Admin\ProductController::class, 'destroy'])->name('product.destroy');
                Route::post('product/{product?}/upload-cropped',[\App\Http\Controllers\Admin\ProductController::class, 'uploadCropped'])->name('product.crop-upload');
                Route::get('product/{product}/add_color',[\App\Http\Controllers\Admin\ProductController::class,'addColor'])->name('product.add-color');
                Route::post('product/{product}/store_color',[\App\Http\Controllers\Admin\ProductController::class,'storeColor'])->name('product.store_color');
                Route::get('product/{product}/{product_color}/edit_color',[\App\Http\Controllers\Admin\ProductController::class,'editColor'])->name('product.edit_color');
                Route::put('product/{product}/{product_color}/update_color',[\App\Http\Controllers\Admin\ProductController::class,'updateColor'])->name('product.update_color');
                Route::get('product/{product}/{product_color}/delete_color',[\App\Http\Controllers\Admin\ProductController::class,'deleteColor'])->name('product.delete_color');
                Route::post('product/import',[\App\Http\Controllers\Admin\ProductController::class,'import'])->name('product.import');
//




                Route::post('group-search',[\App\Http\Controllers\Admin\ProductController::class,'getGroups'])->name('search.group');

                Route::get('product/variant/{product}/create',[\App\Http\Controllers\Admin\ProductController::class, 'variantCreate'])->name('product.variant.create');
                Route::post('product/variant/{product}/store',[\App\Http\Controllers\Admin\ProductController::class, 'variantStore'])->name('product.variant.store');

//                // Gallery
                Route::resource('gallery', GalleryController::class);
                Route::get('gallery/{gallery}/destroy', [GalleryController::class, 'destroy'])->name('gallery.destroy');



                // Slider
                Route::resource('slider', SliderController::class);
                Route::get('slider/{slider}/destroy', [SliderController::class, 'destroy'])->name('slider.destroy');

                // Page
                Route::resource('page', PageController::class);
                Route::get('page/{page}/destroy', [PageController::class, 'destroy'])->name('page.destroy');


                Route::get('setting/active',[SettingController::class,'setActive'])->name('setting.active');
                // Setting
                Route::resource('setting', SettingController::class);
                Route::get('setting/{setting}/destroy', [SettingController::class, 'destroy'])->name('setting.destroy');




                // Password
                Route::get('password', [\App\Http\Controllers\Admin\PasswordController::class, 'index'])->name('password.index');
                Route::post('password', [\App\Http\Controllers\Admin\PasswordController::class, 'update'])->name('password.update');

                Route::resource('attribute', \App\Http\Controllers\Admin\AttributeController::class);
                Route::get('attribute/{attribute}/destroy', [\App\Http\Controllers\Admin\AttributeController::class, 'destroy'])->name('attribute.destroy');



                Route::resource('project', \App\Http\Controllers\Admin\ProjectController::class);
                Route::get('project/{project}/destroy', [\App\Http\Controllers\Admin\ProjectController::class, 'destroy'])->name('project.destroy');



                Route::resource('user', \App\Http\Controllers\Admin\UserController::class);
                Route::get('user/{user}/destroy', [\App\Http\Controllers\Admin\UserController::class, 'destroy'])->name('user.destroy');




                Route::resource('contact', \App\Http\Controllers\Admin\ContactController::class);
                Route::get('contact/{contact}/destroy', [\App\Http\Controllers\Admin\ContactController::class, 'destroy'])->name('contact.destroy');



                Route::get('mail-templates',[\App\Http\Controllers\Admin\MailTemplateController::class,'index'])->name('mail-template.index');
                Route::put('mail-templates/update',[\App\Http\Controllers\Admin\MailTemplateController::class,'update'])->name('mail-template.update');




            });
        });


        Route::get('login',[\App\Http\Controllers\Client\AuthController::class,'loginView'])->name('client.login.index')->middleware('guest_client');
        Route::post('login',[\App\Http\Controllers\Client\AuthController::class,'login'])->name('client.login');
        Route::get('registration',[\App\Http\Controllers\Client\AuthController::class,'registrationView'])->name('client.registration.index');
        Route::post('registration',[\App\Http\Controllers\Client\AuthController::class,'createAccount'])->name('client.register');

        Route::get('registration/success',[\App\Http\Controllers\Client\AuthController::class,'registerSuccess'])->name('client.register.success');

        Route::get('logout',[\App\Http\Controllers\Client\AuthController::class,'logout'])->name('logout');


        Route::get('partner-signin',[\App\Http\Controllers\Client\AuthController::class,'partnerLoginView'])->name('partner.login.index')->middleware('guest_p');
        Route::post('partner-signin',[\App\Http\Controllers\Client\AuthController::class,'partnerLogin'])->name('partner.login');

        //Route::get('guarantee', [\App\Http\Controllers\Client\AboutUsController::class, 'guarantee'])->name('client.guarantee');
        Route::get('shipping-payment', [\App\Http\Controllers\Client\AboutUsController::class, 'shippingPayment'])->name('client.shipping-payment');
        Route::get('privacy-policy', [\App\Http\Controllers\Client\AboutUsController::class, 'privacyPolicy'])->name('client.privacy-policy');

        Route::get('get_all_projects/{type?}', [\App\Http\Controllers\Client\ProjectController::class, 'getAllProjects'])->name('client.get-all-projects');

        Route::get('get-products/{category}', [\App\Http\Controllers\Client\ProductController::class, 'getProducts'])->name('client.get-products');

        Route::get('get-color-products', [\App\Http\Controllers\Client\HomeController::class, 'getProducts'])->name('client.color-products');

        Route::get('/forgot-password', [\App\Http\Controllers\Client\AuthController::class,'forgotPassword'])->middleware('guest')->name('password.request');

        Route::post('/forgot-password', function (Request $request) {
            //dd($request->all());
            $request->validate(['email' => 'required|email']);

            $status = Password::sendResetLink(
                $request->only('email')
            );

            //dd($status);
            return $status === Password::RESET_LINK_SENT
                ? back()->with(['success' => __($status)])
                : back()->withErrors(['email' => __($status)]);
        })->middleware('guest')->name('password.email');

        Route::get('/reset-password/{token}', [\App\Http\Controllers\Client\AuthController::class,'resetPassword'])->middleware('guest')->name('password.reset');

        Route::post('/reset-password', function (Request $request) {
            //dd($request->all());
            $request->validate([
                'token' => 'required',
                'email' => 'required|email',
                'password' => 'required|min:8|confirmed',
            ]);

            $status = Password::reset(
                $request->only('email', 'password', 'password_confirmation', 'token'),
                function ($user, $password) {
                    $user->forceFill([
                        'password' => Hash::make($password)
                    ])->setRememberToken(Str::random(60));

                    $user->save();

                    event(new PasswordReset($user));
                }
            );

            //dd($status);

            return $status === Password::PASSWORD_RESET
                ? redirect()->route('client.login')->with('success', __($status))
                : back()->withErrors(['email' => [__($status)]]);
        })->middleware('guest')->name('password.update');

        Route::middleware(['auth_partner','is_partner'])->group(function (){



            Route::get('invoice/{order}',[\App\Http\Controllers\Client\UserController::class,'invoice'])->name('client.invoice');
        });

        Route::middleware(['auth_client'])->group(function (){
            Route::get('account',[\App\Http\Controllers\Client\UserController::class,'index'])->name('client.cabinet');
            Route::get('account/orders',[\App\Http\Controllers\Client\UserController::class,'orders'])->name('client.orders');
            Route::get('account/order/{order}/details',[\App\Http\Controllers\Client\UserController::class,'orderDetails'])->name('client.order-details');







            Route::post('settings',[\App\Http\Controllers\Client\UserController::class,'saveSettings'])->name('client.save-settings');
            Route::get('invoice/{order}',[\App\Http\Controllers\Client\UserController::class,'invoice'])->name('client.invoice');
        });







        Route::get('projects', [\App\Http\Controllers\Client\ProjectController::class, 'index'])->name('client.project.index');
        Route::get('project/{project}', [\App\Http\Controllers\Client\ProjectController::class, 'show'])->name('client.project.show');

        Route::middleware(['active'])->group(function () {

            // Home Page
            Route::get('', [HomeController::class, 'index'])->name('client.home.index');



            // Contact Page
            Route::get('/contact', [ContactController::class, 'index'])->name('client.contact.index');
            Route::post('/contact-us', [ContactController::class, 'mail'])->name('client.contact.mail');


            // About Page
            Route::get('about', [AboutUsController::class, 'index'])->name('client.about.index');











            // Product Page
            Route::get('products', [\App\Http\Controllers\Client\ProductController::class, 'index'])->name('client.product.index');
           Route::get('product/{product}', [\App\Http\Controllers\Client\ProductController::class, 'show'])->name('client.product.show');

           Route::get('category/{category}',[\App\Http\Controllers\Client\CategoryController::class,'show'])->name('client.category.show');
            Route::get('popular',[\App\Http\Controllers\Client\CategoryController::class,'popular'])->name('client.category.popular');
            Route::get('special',[\App\Http\Controllers\Client\CategoryController::class,'special'])->name('client.category.special');
            Route::get('new',[\App\Http\Controllers\Client\CategoryController::class,'new'])->name('client.category.new');
            Route::get('sale',[\App\Http\Controllers\Client\CategoryController::class,'special'])->name('client.category.sale');
            Route::get('you-may-like',[\App\Http\Controllers\Client\CategoryController::class,'youMayLike'])->name('client.category.like');

            //checkout



            Route::get('search', [\App\Http\Controllers\Client\SearchController::class, 'index'])->name('search.index');




            /*Route::get('test/{method}',function ($locale,$method,\App\Http\Controllers\TestController $testController){

                return $testController->{$method}();
            });

            Route::post('test/filter',[\App\Http\Controllers\TestController::class,'filter']);*/
            Route::get('/email/verify/{id}/{hash}', function (EmailVerificationRequest $request) {
                $request->fulfill();

                return redirect(route('client.cabinet'));
            })->middleware(['auth_client', /*'signed'*/])->name('verification.verify');

            Route::post('/email/verification-notification', function (Request $request) {
                $request->user()->sendEmailVerificationNotification();

                return back()->with('success', 'Verification link sent!');
            })->middleware(['auth_client', 'throttle:6,1'])->name('verification.send');
        });



        //Social-------------------------------------------------------
        Route::get('/auth/facebook/redirect', function () {
            return Socialite::driver('facebook')->redirect();
        })->name('fb-redirect');

        Route::get('/auth/facebook/callback', function () {
            //dd('jdfhgjdhjf urkl');
            $facebookUser = Socialite::driver('facebook')->stateless()->user();

            //dd($facebookUser);

            if ($facebookUser->email !== null) {
                $email = $facebookUser->email;

                $user = User::query()->where('email', $email)->first();

                if($user){
                    $user->update([
                        //'name' => $facebookUser->name,
                        'facebook_id' => $facebookUser->id,
                        'facebook_token' => $facebookUser->token,
                        'facebook_refresh_token' => $facebookUser->refreshToken,
                        'avatar' => $facebookUser->avatar
                    ]);
                } else {
                    $user = User::query()->create([
                        'email' => $email,
                        'name' => $facebookUser->name,
                        'facebook_id' => $facebookUser->id,
                        'facebook_token' => $facebookUser->token,
                        'facebook_refresh_token' => $facebookUser->refreshToken,
                        'avatar' => $facebookUser->avatar,
                        'affiliate_id' => (string) Str::uuid()
                    ]);
                }
            } else {


                $user = User::query()->where('facebook_id', $facebookUser->id)->first();

                if($user){
                    $user->update([
                        //'name' => $facebookUser->name,
                        'facebook_token' => $facebookUser->token,
                        'facebook_refresh_token' => $facebookUser->refreshToken,
                        'avatar' => $facebookUser->avatar
                    ]);
                } else {
                    $email = uniqid();
                    $user = User::query()->create([
                        'email' => $email,
                        'name' => $facebookUser->name,
                        'facebook_id' => $facebookUser->id,
                        'facebook_token' => $facebookUser->token,
                        'facebook_refresh_token' => $facebookUser->refreshToken,
                        'avatar' => $facebookUser->avatar,
                        'affiliate_id' => (string) Str::uuid()
                    ]);
                }
            }




            //dd($user);

            Auth::login($user);

            return redirect(route('client.cabinet'));
        })->name('fb-callback');

        Route::get('/auth/google/redirect', function () {
            return Socialite::driver('google')->redirect();
        })->name('google-redirect');

        Route::get('/auth/google/callback', function () {
            $googleUser = Socialite::driver('google')->user();

            $user = User::query()->where('email', $googleUser->email)->first();

            if($user){
                $user->update([
                    //'name' => $googleUser->name,
                    'google_id' => $googleUser->id,
                    'google_token' => $googleUser->token,
                    'google_refresh_token' => $googleUser->refreshToken,
                    'avatar' => $googleUser->avatar,
                ]);
            } else {
                $user = User::query()->create([
                    'email' => $googleUser->email,
                    'name' => $googleUser->name,
                    'google_id' => $googleUser->id,
                    'google_token' => $googleUser->token,
                    'google_refresh_token' => $googleUser->refreshToken,
                    'avatar' => $googleUser->avatar,
                    'affiliate_id' => (string) Str::uuid()
                ]);
            }

            //dd($googleUser);



            //dd($user);

            Auth::login($user);

            return redirect(route('client.cabinet'));
        })->name('google-callback');
        //--------------------------------------------------------------------------



        //Route::fallback(\App\Http\Controllers\Client\ProxyController::class . '@index')->name('proxy');
    });


