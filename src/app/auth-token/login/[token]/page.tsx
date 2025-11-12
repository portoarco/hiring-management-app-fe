"use client";

import { Spinner } from "@/components/ui/spinner";
import { apiCall } from "@/helper/apiCall";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import AuthLayoutWrapper from "../../../auth/layoutWrapper";
import { toast } from "sonner";

export default function MagicLinkVerificationPage() {
  const router = useRouter();
  const params = useParams();

  useEffect(() => {
    const verifyToken = async () => {
      if (!params.token) return router.replace("/auth/login");

      try {
        const res = await apiCall.get(`/api/auth/check-token`, {
          headers: { Authorization: `Bearer ${params.token}` },
        });

        localStorage.setItem("user_token", res.data.token);
        const userRole = res.data.role;
        if (userRole === "APPLICANT")
          return router.replace("/dashboard/joblist");
        if (userRole === "RECRUITER")
          return router.replace("/dashboard/jobportal-admin");
      } catch (error) {
        console.error("Token invalid atau expired", error);
        toast.error("Token Invalid, Silakan Login Ulang");
        router.replace("/auth/login");
      }
    };

    verifyToken();
  }, [params.token, router]);

  return (
    <AuthLayoutWrapper>
      <div className="flex flex-col items-center gap-4 py-8 text-center">
        <Spinner className="h-12 w-12" />
        <h2 className="text-xl font-semibold text-gray-800">
          Memverifikasi data Anda...
        </h2>
        <p className="text-gray-600">Mohon tunggu sebentar...</p>
      </div>
    </AuthLayoutWrapper>
  );
}
