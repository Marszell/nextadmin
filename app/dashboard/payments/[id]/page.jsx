import AddOrUpdatePaymentPage from "@/app/dashboard/payments/AddOrUpdatePaymentPage";

const UpdatePaymentPage = ({ params }) => {
    const id = params.id;

    return <AddOrUpdatePaymentPage
        isCreate={false}
        id={id}
    />
}

export default UpdatePaymentPage