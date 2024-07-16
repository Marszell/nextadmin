import AddOrUpdateGamePage from "@/app/dashboard/games/AddOrUpdateGamePage";

const UpdateGamePage = ({ params }) => {
    const id = params.id;

    return <AddOrUpdateGamePage
        isCreate={false}
        id={id}
    />
}

export default UpdateGamePage