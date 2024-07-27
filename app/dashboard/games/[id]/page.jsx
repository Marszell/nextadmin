import AddOrUpdateGamePage from "@/app/dashboard/games/AddOrUpdateGamePage";

//this function is for review (1 game)
const UpdateGamePage = ({ params }) => {
    const id = params.id;

    return <AddOrUpdateGamePage
        isCreate={false}
        id={id}
    />
}

export default UpdateGamePage