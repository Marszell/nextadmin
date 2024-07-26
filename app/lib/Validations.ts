import {z} from 'zod';

const MAX_UPLOAD_SIZE = 1024 * 1024 * 3; // 3MB
const ACCEPTED_FILE_TYPES = ['image/png', 'image/jpg', 'image/jpeg', 'image/webp'];

const imageFileValidation = z
    .instanceof(File)
    .optional()
    .refine((file) => {
        return !file || file.size <= MAX_UPLOAD_SIZE;
    }, 'File size must be less than 3MB')
    .refine((file) => {
        return ACCEPTED_FILE_TYPES.includes(file.type);
    }, 'File must be an image');

export const GameFormSchema = z.object({
    id: z.number({
        required_error: "Please input id",
        invalid_type_error: "Please input valid id"
    }),
    name: z.string({
        required_error: "Please input name"
    }),
    file: imageFileValidation
});

export const UserFormSchema = z.object({
    id: z.number({
        required_error: "Please input id",
        invalid_type_error: "Please input valid id"
    }),
    email: z.string({required_error: "Please input name"})
        .email("This is not valid email"),
    name: z.string({
        required_error: "Please input name"
    }),
    password: z.string({
        required_error: "Please input password"
    }).min(6, { message: "Password must be at least 6 characters" }),
    file: imageFileValidation
});

export const ProductFormSchema = z.object({
    id: z.number({
        required_error: "Please input id",
        invalid_type_error: "Please input valid id"
    }),
    name: z.string({
        required_error: "Please input name"
    }),
    game_id: z.number({
        required_error: "Please input game_id"
    }),
    file: imageFileValidation,
    price: z.number({
        invalid_type_error: "Please input valid price",
        required_error: "Please input price",
    }),
    quantity: z.number({
        invalid_type_error: "Please input valid quantity",
        required_error: "Please input quantity",
    }),
});

export const PaymentFormSchema = z.object({
    id: z.number({
        required_error: "Please input id",
        invalid_type_error: "Please input valid id"
    }),
    name: z.string({
        required_error: "Please input name"
    }),
    file: imageFileValidation
});

export const TransactionFormSchema = z.object({
    id: z.string({
        required_error: "Please input id",
        invalid_type_error: "Please input valid id"
    }),
    uid: z.string({
        required_error: "Please input game UID"
    }),
    product_id: z.number({
        required_error: "Please input Product ID",
        invalid_type_error: "Please input valid Product ID"
    }),
    payment_id: z.number({
        required_error: "Please input Payment ID",
        invalid_type_error: "Please input valid Payment ID"
    }),
});