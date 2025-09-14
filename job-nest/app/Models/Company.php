<?php



namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable; // <-- Important
use Laravel\Sanctum\HasApiTokens;

class Company extends Authenticatable
{
    use HasApiTokens, HasFactory;

    protected $fillable = [
        'name',
        'address',
        'email',
        'password',
        'established_year',
        'website',
        'contact_number',
        'role',
    ];
    protected $casts = [
        'is_active' => 'boolean',
    ];
    public function jobs()
    {
        return $this->hasMany(Job::class, 'company_id'); 
        
    }
       
}
