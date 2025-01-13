<?php

namespace App\Http\Controllers;

use App\Models\Owned;
use App\Models\Seen;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class OwnedController extends Controller
{
  public function index(): Response
  {
    $owned_info = Owned::with('seen')
      ->where('user_id', Auth::id())
      ->get();

    $converted = $owned_info->map(function ($owned) {
      $ownedData = $owned->toArray();
      $seenData = $owned->seen ? $owned->seen->toArray() : [];
      $seenData['seenName'] = $owned->seen->name;

      unset($seenData['name']);
      unset($seenData['id']);
      unset($ownedData['seen']);

      return array_merge($ownedData, $seenData);
    });

    return Inertia::render('Owned/Index', [
      'ownedCards' => $converted
    ]);
  }

  /**
   * Show the form for creating a new resource.
   */
  public function create()
  {
    //
  }

  /**
   * Store a newly created resource in storage.
   */
  public function store(Request $request)
  {
    /* dd($request); */
    $rawId = $request->cardId . ':' . $request->type;

    $seen = Seen::firstOrCreate(
      ['id' => $rawId], // Find by this unique identifier
      [                 // Create with these values if not found
        'name' => $request->name,
        'number' => $request->number,
        'cardId' => $request->cardId,
        'image' => $request->image,
        'type' => $request->type,
        'setId' => $request->setId,
        'setName' => $request->setName,
        'setImage' => $request->setImage,
        'setSeries' => $request->setSeries,
        'rarity' => $request->rarity,
        'rawJson' => $request->rawJson,
      ]
    );

    $owned = [
      'name' => $seen->name,
      'pricePaid' => 5,  // Allow mass-assignment for pricePaid
      'seen_id' => $seen->id,    // Allow mass-assignment for seen_id
      'user_id' => Auth::id(),
    ];


    Owned::create($owned);

    return redirect()->route('owned.index');
  }

  /**
   * Display the specified resource.
   */
  public function show(Owned $owned)
  {
    //
  }

  /**
   * Show the form for editing the specified resource.
   */
  public function edit(Owned $owned)
  {
    //
  }

  /**
   * Update the specified resource in storage.
   */
  public function update(Request $request, Owned $owned)
  {
    //
  }

  /**
   * Remove the specified resource from storage.
   */
  public function destroy(Owned $owned)
  {
    //
  }
}
