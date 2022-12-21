<?php

namespace Database\Seeders;

use App\Models\Setting;
use App\Models\Translations\SettingTranslation;
use Illuminate\Database\Seeder;

class SettingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        $Settings = [
            [
                'key' => 'phone'
            ],
            [
                'key' => 'email'
            ],
            [
                'key' => 'address'
            ],
            [
                'key' => 'facebook'
            ],
            [
                'key' => 'instagram'
            ],
            [
                'key' => 'twitter'
            ]
        ];

        // Insert Settings
        Setting::insert($Settings);
    }
}
