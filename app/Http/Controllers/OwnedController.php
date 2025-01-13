<?php

namespace App\Http\Controllers;

use App\Models\Owned;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class OwnedController extends Controller
{
  /**
   * Display a listing of the resource.
   */
  public function index(): Response

  {
    $ownedAll = Owned::all();

    return Inertia::render('Owned/Index', [
      'ownedCards' => $ownedAll,
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
    /* $request->validate([ */
    /*   'name' => 'required|string|max:255', */
    /*   'number' => 'required|string|max:255', */
    /*   'cardId' => 'required|string|max:255', */
    /*   'image' => 'required|string|max:255', */
    /*   'setId' => 'required|string|max:255', */
    /*   'setName' => 'required|string|max:255', */
    /*   'setSeries' => 'required|string|max:255', */
    /*   'rarity' => 'required|string|max:255', */
    /*   'rawJson' => 'required|json', */
    /* ]); */

    // Create the Owned record and associate with the authenticated user
    Owned::create([
      'name' => $request->name,
      'number' => $request->number,
      'cardId' => $request->cardId,
      'image' => $request->image,
      'setId' => $request->setId,
      'setName' => $request->setName,
      'setImage' => $request->setImage,
      'setSeries' => $request->setSeries,
      'rarity' => $request->rarity,
      'rawJson' => $request->rawJson,
      'user_id' => Auth::id(),
    ]);

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
