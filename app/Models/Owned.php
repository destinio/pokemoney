<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Owned extends Model
{
  /** @use HasFactory<\Database\Factories\OwnedFactory> */
  use HasFactory;

  protected $table = "owned";

  // Specify the columns that can be mass-assigned
  protected $fillable = [
    'name',
    'pricePaid',  // Allow mass-assignment for pricePaid
    'seen_id',    // Allow mass-assignment for seen_id
    'user_id',    // Allow mass-assignment for user_id
  ];

  // Define the relationship to the User model
  public function user()
  {
    return $this->belongsTo(User::class); // Each Owned entry belongs to a User
  }

  public function seen()
  {
    return $this->belongsTo(Seen::class); // Each Owned entry belongs to a Seen
  }
}
