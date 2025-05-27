
export const regularExpsValidation={

    email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    name: /^[a-zA-Z]+$/,
    role: /^(admin|user)$/,
    img: /^(http|https):\/\/.+$/,
    id: /^[0-9a-fA-F]{24}$/,
    token: /^[0-9a-fA-F]{24}$/,
    date: /^\d{4}-\d{2}-\d{2}$/,
    time: /^\d{2}:\d{2}:\d{2}$/,
}