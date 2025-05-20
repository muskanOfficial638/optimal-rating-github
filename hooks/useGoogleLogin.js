import { useState, useEffect } from "react";

const useGoogleLogin = (socialRegister, t, loading) => {
    // const [loading, setLoading] = useState(false);
    const [isRegistered, setIsRegistered] = useState(false);
    const [session, setSession] = useState(null);

    useEffect(() => {
        const stored = localStorage.getItem("session");
        if (stored) {
            try {
                const parsedSession = JSON.parse(stored);
                setSession(parsedSession);
            } catch (error) {
                console.error("Error parsing session from localStorage:", error);
                localStorage.removeItem("session");
            }
        }
    }, []);

    useEffect(() => {
        if (session && !isRegistered && !loading) {
            const registerSocialUser = async () => {
                try {
                    if (!localStorage.getItem("registered")) {
                        setLoading(true);
                        localStorage.setItem("session", JSON.stringify(session));
                        await socialRegister({
                            token: session.accessToken,
                            provider: session.provider,
                            countryCode: session.countryCode,
                        });
                        notification.success({ message: t("msg.success_login") });
                        setIsRegistered(true);
                        localStorage.setItem("registered", "true");
                    }
                } catch (error) {
                    localStorage.clear();
                    console.error("Error during social login:", error);
                } finally {
                    setLoading(false);
                }
            };
            registerSocialUser();
        }
    }, [session, isRegistered, loading, socialRegister, t]);

    return { loading, isRegistered, setSession };
};

export default useGoogleLogin;
