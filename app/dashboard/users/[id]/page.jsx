import AddOrUpdateUserPage from "@/app/dashboard/users/AddOrUpdateUserPage";

const UpdateUserPage = ({ params }) => {
    const id = params.id;

    return <AddOrUpdateUserPage
        isCreate={false}
        id={id}
    />
}

export default UpdateUserPage