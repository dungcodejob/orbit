import { useMutation } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { useAuthStore } from "../stores";
import { toast } from "sonner";


export const useLogout = () => {
    const { logout } = useAuthStore();
    const { t } = useTranslation();
    const mutation = useMutation({
        mutationFn: logout,
    })

    return {
        ...mutation,
        mutateAsync: () => toast.promise(mutation.mutateAsync(), {
            loading: t('auth.logging_out'),
            success: t('auth.logout_success'),
            error: t('auth.logout_failed'),
        })
    }
}