"use client"
import AddOrUpdateGamePage from "@/app/dashboard/games/AddOrUpdateGamePage";

//this function is for display add games in admin page games
export default function AddGamePage() {
    return <AddOrUpdateGamePage
        isCreate={true}
    />
}