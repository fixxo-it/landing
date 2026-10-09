import type { Metadata } from 'next';
import LegalPage from '@/components/legal/LegalPage';

export const metadata: Metadata = {
  title: 'Refund Policy | FamCare',
};

export default function RefundPolicyPage() {
  return (
    <LegalPage title="Refund Policy" updated="Last Updated: October 2026">
      <p>
        At FamCare, we aim to provide exceptional caregiving services for your
        loved ones. We understand that plans can change, and we strive to
        provide a fair and transparent refund policy.
      </p>

      <h2>1. Services Refund</h2>
      <p>
        A partial or full refund for services may be available depending on the
        timing of your cancellation when you have pre-paid for appointments. We
        offer several refund options for pre-paid services.
      </p>

      <h2>2. Cancellation Windows</h2>

      <h3>Scheduled Bookings</h3>
      <ul>
        <li>
          <strong>4+ Hours Notice:</strong> If you cancel a confirmed Session at
          least four (4) hours before its scheduled start time, no cancellation
          charges apply and you are eligible for a full refund or credit for a
          future Session.
        </li>
        <li>
          <strong>Less Than 4 Hours Notice:</strong> Cancellations made less
          than four (4) hours before the scheduled start time may attract
          cancellation charges, up to the full Session fee, as resources have
          already been allocated and the caregiver has been assigned.
        </li>
        <li>
          <strong>No-Show:</strong> If you are not available when the Session is
          due to begin, the booking is treated as a late cancellation and the
          same charges may apply.
        </li>
      </ul>

      <h3>Instant Bookings</h3>
      <ul>
        <li>
          <strong>Cancellation After Confirmation:</strong> You may cancel an
          instant booking at any time; however, as an instant booking begins
          within four (4) hours of confirmation, cancellation charges may apply,
          since the caregiver may already be on the way and resources may have
          been utilised.
        </li>
      </ul>

      <h3>Cancellations by FamCare</h3>
      <p>
        If FamCare cancels a confirmed booking (for example due to caregiver
        unavailability, safety concerns, or operational issues), you will
        receive a full refund of the fees paid for that Session, unless the
        cancellation results from your own conduct or a breach of our{' '}
        <a href="/terms-and-conditions">Terms of Use</a>.
      </p>

      <h3>Exceptional Circumstances</h3>
      <p>
        Genuine medical emergencies and other exceptional situations may be
        reviewed on a case-by-case basis. Any refund or credit in such cases is
        at FamCare&rsquo;s sole discretion.
      </p>

      <h2>3. Service Quality Refund</h2>
      <p>
        If you are dissatisfied with the quality of care provided during an
        appointment, please contact our support team within 24 hours of the
        completion of the service. We will review your case and may offer a full
        or partial refund or credit as a gesture of goodwill.
      </p>

      <h2>4. Refund Processing</h2>
      <p>
        Refunds are processed using the original payment method and within 5-10
        business days of the refund approval. FamCare is not liable for any
        transaction fees or charges imposed by banks or payment service
        providers in connection with processing a refund.
      </p>

      <h2>5. Promotional Services</h2>
      <p>
        Discounted or promotional services are non-refundable unless otherwise
        specified in the promotion&rsquo;s terms and conditions.
      </p>

      <h2>6. Dispute Resolution</h2>
      <p>
        In the event of a payment dispute, we encourage you to contact us
        directly at{' '}
        <a href="mailto:support@famcare.co.in">support@famcare.co.in</a> to
        resolve the issue before initiating a chargeback.
      </p>

      <h2>7. Contact Us</h2>
      <p>
        If you have any questions about our Refund Policy or need assistance
        with a refund request, please contact us at{' '}
        <a href="mailto:support@famcare.co.in">support@famcare.co.in</a>.
      </p>
    </LegalPage>
  );
}
