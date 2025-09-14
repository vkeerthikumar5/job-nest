<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Job extends Model
{
    use HasFactory;
    protected $table = 'new_jobs'; 


    protected $fillable = [
        'company_id',
        'desc',
        'title',
        'skills',
        'package',
        'mode',
        'location',
        'timings',
        'status',
    ];

    public function company()
    {
        return $this->belongsTo(Company::class);
    }

    public function applications()
{
    return $this->hasMany(Application::class, 'job_id');
}

}

