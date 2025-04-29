import { useMutation } from "@tanstack/react-query";
import { useAuthStore } from "../stores"
import { toast } from "sonner";
import { LoginCredentials } from "../types";
import { useTranslation } from "react-i18next";


export const useLogin = () => {
    const { login } = useAuthStore();
    const { t } = useTranslation();
    const mutation = useMutation({
        mutationFn: login,
    })

    return {
        ...mutation,
        mutateAsync: (data: LoginCredentials) => toast.promise(mutation.mutateAsync(data), {
            loading: t('auth.logging_in'),
            success: t('auth.login_success'),
            error: t('auth.login_failed'),
        })
    }
}