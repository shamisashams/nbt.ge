<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class UpdateProjectsAddCustomer extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //
        Schema::table('projects', function (Blueprint $table) {

            $table->string('customer')->nullable();
        });
        Schema::table('project_translations', function (Blueprint $table) {

            $table->string('customer_title')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
        Schema::table('projects', function (Blueprint $table) {

            $table->dropColumn('customer');
        });
        Schema::table('project_translations', function (Blueprint $table) {

            $table->dropColumn('customer_title');
        });
    }
}
