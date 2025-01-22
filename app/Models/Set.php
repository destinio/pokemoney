<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Set extends Model
{
  /** @use HasFactory<\Database\Factories\SetFactory> */
  use HasFactory;

  protected $fillable = ['name', 'series_id', 'printed_total', 'total', 'release_date', 'symbol_url', 'logo_url'];

  // Specify the primary key and key type
  protected $primaryKey = 'id';  // The column name of your primary key
  protected $keyType = 'string'; // The primary key is a string
  public $incrementing = false;  // The primary key is not auto-incrementing


  /**
   * Get all of the seen cards for the set.
   */
  public function seen()
  {
    return $this->hasMany(Seen::class, 'set_id');
  }

  /**
   * Get the series that owns the set.
   */
  public function series()
  {
    return $this->belongsTo(Series::class);
  }
}
