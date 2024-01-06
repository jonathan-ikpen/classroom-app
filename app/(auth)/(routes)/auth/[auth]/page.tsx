import LoginForm from "../components/login-form-v2";

export default function Page({ params }: { params: { auth: string } }) {
    // console.log(params.auth)
    return (
        <div className="px-7 flex max-w-xl mx-auto flex-col items-center justify-center w-full min-h-screen">
            {params.auth == 'signup' ? <LoginForm slug={'/signup'}/> : <LoginForm slug={'/login'} /> }
        </div>
    );
};

