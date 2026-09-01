import type { Metadata } from "next";
import LegalPage from "@/components/legal/LegalPage";

export const metadata: Metadata = {
  title: "Data Deletion — FamCare",
};

export default function DataDeletionPage() {
  return (
    <LegalPage title="Deletion of Data" updated="Last Updated: May 2026">
      <p>
        At FamCare, we respect your privacy and provide you with the option to
        delete your personal data and account information from our systems.
      </p>

      <h2>How to Request Data Deletion</h2>
      <p>
        If you wish to delete your account and all associated personal
        information, please send an email to our founding team from your
        registered email address.
      </p>
      <p>
        Email Address:{" "}
        <a href="mailto:support@famcare.co.in">support@famcare.co.in</a>
      </p>
      <p>Subject: Account Deletion Request - [Your Full Name]</p>

      <h2>What Happens After Your Request?</h2>
      <p>
        Once we receive your email, our team will process your request within
        7-10 business days. Please note the following:
      </p>
      <ul>
        <li>
          <strong>Verification:</strong> We may contact you to verify your
          identity before proceeding with the deletion to ensure the security
          of your account.
        </li>
        <li>
          <strong>Data Removal:</strong> We will permanently delete your
          profile, contact details, and history from our active databases.
        </li>
        <li>
          <strong>Exceptions:</strong> Certain information may be retained if
          required by law or for legitimate business purposes such as tax,
          audit, or legal obligations.
        </li>
        <li>
          <strong>Confirmation:</strong> You will receive a confirmation email
          once the deletion process is complete.
        </li>
      </ul>

      <p>
        If you have any questions regarding our data handling practices,
        please feel free to reach out to us at the same email address.
      </p>
    </LegalPage>
  );
}
