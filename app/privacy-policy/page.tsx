import type { Metadata } from "next";
import LegalPage from "@/components/legal/LegalPage";

export const metadata: Metadata = {
  title: "Privacy Policy — FamCare",
};

const ADDRESS =
  "Sabari Complex, National Plaza, 24, Field Marshal Cariappa Rd, Shanthala Nagar, Ashok Nagar, Bengaluru, Karnataka 560025";

export default function PrivacyPolicyPage() {
  return (
    <LegalPage title="Privacy Policy" updated="Effective Date: August 2026">
      <p>
        The FamCare mobile application is owned, developed, and operated by
        FamCare Technologies Private Limited, a company incorporated under
        the Companies Act, 2013, having its registered office at {ADDRESS}{" "}
        (hereinafter referred to as &ldquo;FamCare&rdquo;, &ldquo;we&rdquo;,
        &ldquo;our&rdquo;, or &ldquo;us&rdquo;). Through the Platform,
        families can access verified babysitting and childcare services
        while prioritizing safety, trust, and convenience.
      </p>
      <p>
        This Privacy Policy is issued in accordance with the Digital
        Personal Data Protection Act, 2023 (&ldquo;DPDP Act&rdquo;), the
        Information Technology Act, 2000 (&ldquo;IT Act&rdquo;), the
        Information Technology (Reasonable Security Practices and
        Procedures and Sensitive Personal Data or Information) Rules, 2011
        (&ldquo;SPDI Rules&rdquo;), the CERT-In Directions, and other
        applicable Indian laws. The policy also reflects the protections for
        children&rsquo;s data under Section 9 of the DPDP Act, including
        verifiable parental consent, no tracking, no behavioural monitoring,
        and no targeted advertising directed at children, and restrictions
        on cross-border transfer of data of minors as set out in this Policy
        and applicable law. By accessing or using the Platform, you
        acknowledge that you have read and understood this Privacy Policy
        and agree to its terms, to the extent applicable.
      </p>

      <h2>Scope of this Policy</h2>
      <p>
        This Privacy Policy applies to all personal data collected,
        processed, stored, or shared by FamCare through its website, mobile
        application, and related services. It covers personal data of
        users, parents, guardians, caregivers (including babysitters),
        website visitors, and any other individuals who interact with the
        Platform. This Policy governs the collection, use, disclosure,
        retention, and protection of personal data in connection with the
        provision of babysitting, childcare, and related caregiving
        services offered by FamCare.
      </p>
      <p>
        This Policy is intended to be read together with our Terms of Use,
        consent notices, service-specific notices, and any supplementary
        privacy notices that may be issued from time to time.
      </p>

      <h2>Definitions</h2>
      <ul>
        <li>
          <strong>&ldquo;Account&rdquo;</strong> means the registered
          profile created by a User or Caregiver to access and use the
          Platform and its services.
        </li>
        <li>
          <strong>&ldquo;Applicable Law&rdquo;</strong> means all statutes,
          rules, regulations, notifications, directions, guidelines,
          judicial orders, governmental directives, and other legally
          binding requirements applicable to FamCare, including the DPDP
          Act, IT Act, SPDI Rules, and the directions issued by the Indian
          Computer Emergency Response Team (&ldquo;CERT-In
          Directions&rdquo;).
        </li>
        <li>
          <strong>&ldquo;Business Transfer&rdquo;</strong> means any merger,
          acquisition, amalgamation, restructuring, financing transaction,
          change in control, sale of assets, or similar corporate
          transaction involving FamCare.
        </li>
        <li>
          <strong>&ldquo;Child&rdquo;</strong> means a person who has not
          completed eighteen (18) years of age, as defined under the DPDP
          Act.
        </li>
        <li>
          <strong>&ldquo;Caregiver&rdquo;</strong> means any individual
          registered on the Platform as a nanny, babysitter, companion,
          childcare provider, elder care provider, or other care
          professional offering services to Users. For clarity, the term
          babysitter is included within Caregiver.
        </li>
        <li>
          <strong>&ldquo;Consent&rdquo;</strong> means a freely given,
          specific, informed, unconditional, and unambiguous indication of
          the Data Principal&rsquo;s agreement to the processing of personal
          data, as recognised under the DPDP Act.
        </li>
        <li>
          <strong>&ldquo;Consent Manager&rdquo;</strong> shall have the
          meaning assigned to it under section 2(g) of the Digital Personal
          Data Protection Act, 2023, and any rules made thereunder.
        </li>
        <li>
          <strong>&ldquo;Cross-Border Data Transfer&rdquo;</strong> means
          the transfer of personal data outside the territory of India.
        </li>
        <li>
          <strong>&ldquo;Data Fiduciary&rdquo;</strong> means FamCare, being
          the entity that determines the purpose and means of processing
          personal data.
        </li>
        <li>
          <strong>&ldquo;Data Principal&rdquo;</strong> means the individual
          to whom personal data relates, including Users and Caregivers on
          the Platform.
        </li>
        <li>
          <strong>&ldquo;Data Processor&rdquo;</strong> means any person,
          including an entity or contractual service provider, that
          processes personal data on behalf of the Data Fiduciary.
        </li>
        <li>
          <strong>&ldquo;Grievance Officer&rdquo;</strong> means the person
          designated by FamCare to address complaints, exercise oversight
          over grievance redressal, coordinate with the Data Protection
          Board of India where required and ensure timely resolution of
          privacy-related complaints.
        </li>
        <li>
          <strong>&ldquo;Notice&rdquo;</strong> means any privacy notice,
          consent request, disclosure statement, communication, or
          information provided by FamCare regarding the collection,
          processing, sharing, retention, or protection of personal data.
        </li>
        <li>
          <strong>&ldquo;Parent&rdquo; or &ldquo;Guardian&rdquo;</strong>{" "}
          means a person recognised as such under applicable Indian law,
          including the Guardians and Wards Act, 1890 and the Hindu
          Minority and Guardianship Act, 1956, who has lawful authority to
          act for a Child.
        </li>
        <li>
          <strong>&ldquo;Personal Data&rdquo;</strong> means any data about
          an individual who is identifiable by or in relation to such data.
        </li>
        <li>
          <strong>&ldquo;Processing&rdquo;</strong> includes collection,
          storage, retrieval, use, sharing, disclosure, transfer, erasure,
          destruction, and other operations performed on personal data.
        </li>
        <li>
          <strong>&ldquo;Platform&rdquo;</strong> means the FamCare mobile
          application, website, and associated digital services.
        </li>
        <li>
          <strong>
            &ldquo;Sensitive Personal Data or Information&rdquo; or
            &ldquo;SPDI&rdquo;
          </strong>{" "}
          includes passwords, financial information, health data, biometric
          data, and such other categories recognised under applicable law.
        </li>
        <li>
          <strong>&ldquo;Third-Party Service Provider&rdquo;</strong> means
          any independent contractor, vendor, payment processor, cloud
          service provider, hosting provider, communication service
          provider, verification agency, or technology partner engaged by
          FamCare in connection with the operation of the Platform.
        </li>
        <li>
          <strong>&ldquo;User&rdquo;</strong> means any individual, parent,
          guardian, family member, or authorised representative who
          accesses, registers with, or uses the Platform to request,
          manage, or receive services.
        </li>
        <li>
          <strong>&ldquo;Verification Agency&rdquo;</strong> means any
          third-party agency, service provider, governmental authority, or
          authorised entity engaged by FamCare for identity verification,
          police verification, background screening, reference
          verification, credential validation, or related compliance
          purposes.
        </li>
        <li>
          <strong>&ldquo;Verified Caregiver&rdquo;</strong> means a
          Caregiver who has successfully completed such identity
          verification, background checks, police verification, training
          assessments, reference checks, or other screening requirements as
          may be prescribed by FamCare from time to time. Verification does
          not constitute a guarantee of future conduct, suitability, or
          performance.
        </li>
      </ul>

      <h2>iii. Categories of Personal Data Collected</h2>
      <p>
        3.1 Information provided by Users (Parents / Guardians): full name,
        residential address, contact number, email address, login
        credentials, Child&rsquo;s name, age, date of birth, developmental
        requirements, emergency contact information, payment and billing
        information, session-specific notes, preferences, and special care
        and conditions instructions.
      </p>
      <p>
        3.2 Information provided by Caregivers: full legal name, address,
        contact information, photograph, Aadhaar (collected and stored only
        where legally permitted and in compliance with the Aadhaar Act,
        2016 and UIDAI guidelines), PAN details, employment history,
        professional references, police verification certificate,
        background check reports, skills assessment results, training
        completion records, and bank account information for payment
        remittance where voluntarily provided and legally permissible.
      </p>
      <p>
        3.3 Information collected automatically: device identifier, IP
        address, operating system, app version, browser type, network
        information, cookies, location data during active sessions, session
        duration, in-app activity logs, and interaction data.
      </p>
      <p>
        3.4 Session-generated data: live GPS coordinates of Caregivers
        during service sessions, audio recordings (where explicit, informed
        consent is obtained from the User and the assigned Caregiver in
        accordance with applicable law), video call metadata, in-app
        communication logs, SOS event logs, emergency alert records, and
        geo-fencing alerts.
      </p>
      <p>
        3.5 FamCare shall not collect, process, or disclose any Sensitive
        Personal Data or Information (&ldquo;SPDI&rdquo;), as defined under
        Rule 3 of the Information Technology (Reasonable Security Practices
        and Procedures and Sensitive Personal Data or Information) Rules,
        2011, without obtaining the requisite consent and implementing
        appropriate safeguards as required under applicable law.
      </p>
      <p>
        3.6 Accuracy of Information: Users and Caregivers are responsible
        for ensuring that the personal data and information provided to
        FamCare is accurate, complete, current, and promptly updated
        whenever changes occur.
      </p>

      <h2>iv. Lawful Basis for Processing and Method of Collection</h2>
      <p>
        4.1 FamCare processes Personal Data as defined under Section 2(t)
        of the Digital Personal Data Protection Act, 2023 (&ldquo;DPDP
        Act&rdquo;), and any other applicable law, on the following legal
        grounds:
      </p>
      <ul>
        <li>(a) Consent of the Data Principal;</li>
        <li>
          (b) Compliance with applicable law, court orders, regulatory
          requirements, or lawful government directions; and
        </li>
        <li>
          (c) Certain Legitimate Uses or other lawful grounds expressly
          permitted under applicable law and necessary for the provision,
          safety, security, and operation of the Platform.
        </li>
      </ul>
      <p>
        4.2 Personal data may be collected directly from Users and
        Caregivers during registration, account creation, onboarding,
        booking, use of the Platform, communications with support staff,
        consent forms, device interactions, and through third-party
        verification agencies lawfully engaged by FamCare.
      </p>
      <p>
        4.3 Where personal data relating to a Child is collected or
        processed, FamCare shall comply with the requirements set out in
        Section x (Children&rsquo;s Data and Special Protections) of this
        Privacy Policy and Section 9 of the Digital Personal Data
        Protection Act, 2023, including obtaining verifiable parental or
        lawful guardian consent prior to such processing and implementing
        reasonable measures for age and relationship verification, where
        applicable.
      </p>
      <p>
        4.4 FamCare shall collect only such personal data as is necessary
        and proportionate for the stated purpose and shall not process data
        beyond the scope of notice and consent unless otherwise permitted
        by law.
      </p>
      <p>
        4.5 Data Minimisation &mdash; FamCare shall collect, process, and
        retain only such Personal Data as is adequate, relevant, and
        reasonably necessary for the specific purpose for which it is
        collected. No excessive, irrelevant, or disproportionate Personal
        Data shall be requested or processed.
      </p>
      <p>
        4.6 Purpose Limitation &mdash; Personal Data collected by FamCare
        shall be processed only for the purposes specified in this Privacy
        Policy, the relevant privacy notice, or as otherwise permitted
        under applicable law. Personal Data shall not be processed for
        purposes incompatible with or unrelated to the original purpose of
        collection unless fresh notice and consent, where required by law,
        have been obtained.
      </p>
      <p>
        4.7 Accuracy of Personal Data Maintained by FamCare &mdash; In
        addition to the obligation of Users and Caregivers to provide
        accurate information under subsection 3.6, FamCare shall take
        reasonable steps to ensure that Personal Data under its control
        remains accurate and updated to the extent necessary for the
        purposes for which such data is processed. FamCare does not
        independently verify the accuracy of all Personal Data provided by
        Users and Caregivers.
      </p>

      <h2>v. Purposes of Processing</h2>
      <p>
        5.1 Service delivery: to facilitate booking, extensions of
        services, scheduling, assignment, and execution of caregiving
        sessions.
      </p>
      <p>
        5.2 Safety and verification: FamCare may process Personal Data to
        conduct background verification, police verification, identity
        verification, skill assessments, reference checks, credential
        validation, and other safety screening measures in respect of
        Caregivers to enhance the safety and security of Users and
        Children. Such verification measures are undertaken on a
        reasonable efforts basis and do not constitute a guarantee of a
        Caregiver&rsquo;s suitability, character, competence, or future
        conduct. To further strengthen service safety and reduce the risk
        of impersonation, fraud, or unauthorised access, the Parent or
        Guardian shall, before permitting the assigned Caregiver to enter
        the premises or commence the caregiving session, verify the
        identity of the Caregiver by scanning the QR code displayed on the
        Caregiver&rsquo;s official FamCare identification card through the
        Platform and confirming that the name, photograph, identification
        number, and other details displayed on the Platform correspond
        with the individual present at the service location. The User
        shall not permit any individual to provide caregiving services
        unless such verification has been successfully completed and shall
        immediately report any mismatch, invalid QR code, expired
        identification card, suspected impersonation, or other security
        concern to FamCare through the Platform or designated support
        channels. FamCare may process and retain QR code authentication
        records, verification timestamps, verification status, device
        information, session identifiers, and related audit logs solely
        for identity verification, service authentication, fraud
        prevention, child safety, dispute resolution, investigation of
        incidents, audit, and compliance with applicable law. Such QR
        code-based identity verification is an additional security measure
        implemented by FamCare and does not constitute a guarantee of the
        Caregiver&rsquo;s future conduct, suitability, or performance.
      </p>
      <p>
        5.3 Live Tracking and Safety Features: FamCare may process and use
        the live GPS location of Caregivers solely during active service
        sessions for the purposes of service delivery, caregiver
        navigation, session monitoring, emergency response, safety, fraud
        prevention, dispute resolution, and other legitimate operational
        requirements. Such GPS tracking shall cease upon the completion or
        termination of the active service session. FamCare does not
        undertake tracking, behavioural monitoring, or profiling of
        Children through the Platform.
      </p>
      <p>
        5.4 Payment processing: to facilitate collection, settlement,
        refund, and remittance of payments through authorised payment
        service providers.
      </p>
      <p>
        5.5 Platform improvement: to analyse usage data, conduct internal
        research, improve functionality, fix bugs, and enhance the user
        experience, subject to appropriate de-identification or other
        lawful safeguards where possible.
      </p>
      <p>
        5.6 Communications and notifications: to send transactional alerts,
        booking confirmations, payment receipts, safety notifications,
        service updates, and support communications.
      </p>
      <p>
        5.7 Legal compliance: to meet obligations under applicable Indian
        laws, including the IT Act, the DPDP Act, tax laws, labour laws,
        police verification requirements, and orders of courts or
        competent authorities.
      </p>
      <p>
        5.8 Marketing and promotions: only with separate and explicit
        consent, to send promotional communications, subject to opt-out
        rights. Withdrawal of marketing consent shall not affect
        service-related communications.
      </p>
      <p>
        5.9 Child safety limitation: FamCare shall not process the personal
        data of a Child in any manner likely to cause detrimental effect on
        the well-being of the Child, including harm, manipulation,
        exploitation, or unsafe exposure. This reflects the
        child-protection rule in Section 9 of the DPDP Act.
      </p>
      <p>
        5.10 Child safety and service necessity: for babysitting and
        childcare services, FamCare may collect the minimum mandatory data
        necessary to identify the Child, verify the caregiving request, and
        ensure service safety and security.
      </p>
      <p>
        5.11 Fraud Prevention and Platform Integrity: FamCare may process
        personal data for fraud detection, prevention of abuse, trust and
        safety enforcement, identity verification, risk assessment,
        prevention of unauthorised activities, and protection of Users,
        Caregivers, Children, and the Platform.
      </p>
      <p>
        5.12 Investigations and Enforcement: FamCare may process personal
        data to investigate suspected violations of its Terms of Use,
        policies, safety standards, legal obligations, complaints,
        disputes, suspicious activities, or incidents affecting the safety,
        security, or integrity of the Platform and its users.
      </p>

      <h2>vi. Sharing and Disclosure of Personal Data</h2>
      <p>
        6.1 FamCare does not sell, trade, rent, commercially exploit, or
        otherwise disclose personal data except as expressly described in
        this Privacy Policy or as required by applicable law.
      </p>
      <p>
        6.2 Personal data may be shared, on a need-to-know basis and with
        appropriate contractual safeguards, with:
      </p>
      <ul>
        <li>(a) assigned Caregivers for service delivery</li>
        <li>(b) payment service providers for transaction processing</li>
        <li>
          (c) background verification agencies for identity and safety
          checks
        </li>
        <li>(d) technology, cloud, hosting, and infrastructure partners</li>
        <li>
          (e) legal, regulatory, police, or government authorities when
          required by law, court order, or lawful direction.
        </li>
      </ul>
      <p>
        6.3 Personal data may also be disclosed in emergencies where
        disclosure is necessary to protect life, health, safety, or
        property, or to respond to a legitimate safety incident.
      </p>
      <p>
        6.4 All third parties acting on behalf of FamCare are required to
        maintain confidentiality, use the data only for authorised
        purposes, and implement commercially reasonable security measures
        no less protective than those applied by FamCare.
      </p>
      <p>
        6.5 Data Processors: FamCare may engage Data Processors to process
        personal data on its behalf. All Data Processors shall process
        personal data solely pursuant to written instructions from
        FamCare, subject to appropriate contractual, confidentiality, and
        security obligations, and in accordance with applicable law.
      </p>
      <p>
        6.6 Business Transfers: In the event of a merger, acquisition,
        corporate restructuring, financing transaction, sale of assets,
        change in control, or similar business transaction involving
        FamCare, personal data may be transferred to the relevant successor
        entity or transaction counterparty, subject to applicable legal
        requirements and appropriate safeguards.
      </p>
      <p>
        6.7 Third-Party Payment Providers: Payment transactions conducted
        through the Platform may be processed by authorised third-party
        payment service providers. Such providers process personal data in
        accordance with their own privacy policies, terms, and applicable
        regulatory requirements. FamCare is not responsible for the privacy
        practices of independent payment service providers.
      </p>
      <p>
        6.8 Third-Party Verification Sources: Background checks, identity
        verification, police verification, reference checks, and related
        screening activities may rely on information provided by
        governmental authorities, verification agencies, former employers,
        references, or other third-party sources. FamCare does not
        independently guarantee the accuracy, completeness, or continued
        validity of information obtained from such sources.
      </p>
      <p>
        6.9 Vendor Due Diligence &mdash; Before engaging any Third-Party
        Service Provider or Data Processor, FamCare shall undertake
        reasonable due diligence to assess such entity&rsquo;s information
        security practices, technical capabilities, legal compliance,
        confidentiality measures, and ability to process Personal Data in
        accordance with applicable law. Appropriate contractual
        safeguards, including confidentiality, security, and data
        processing obligations, shall be incorporated into all such
        engagements.
      </p>
      <p>
        6.10 Third-Party Recruitment Agencies: FamCare may engage
        authorised third-party recruitment agencies, staffing partners,
        manpower agencies, or placement consultants to identify, recruit,
        verify, and onboard Caregivers. Where necessary, FamCare may
        collect, receive, share, or process Personal Data with such
        agencies solely for recruitment, background verification,
        onboarding, compliance, and service-related purposes. All such
        agencies shall be contractually bound to maintain the
        confidentiality and security of Personal Data, process it only on
        the instructions of FamCare, comply with applicable laws including
        the Digital Personal Data Protection Act, 2023, and shall not use,
        retain, disclose, or process such Personal Data for any purpose
        other than the authorised purpose.
      </p>

      <h2>vii. Retention and Deletion</h2>
      <p>
        7.1 FamCare retains personal data only for as long as necessary for
        the purpose for which it was collected, or for such longer period
        as may be required by applicable law, audit, dispute resolution,
        safety review, tax, accounting, or regulatory obligations.
      </p>
      <p>
        7.2 Account data of Users and Caregivers may be retained for a
        minimum period of three (3) years from the date of last activity or
        account closure, or for such longer period as may be required by
        applicable law, legitimate business purposes, safety
        considerations, or for an active or reasonably anticipated
        dispute, investigation, or legal proceeding.
      </p>
      <p>
        7.3 Session audio recordings (where applicable), GPS logs, security
        logs, system logs, and other operational records shall be retained
        only for as long as necessary for the purposes for which they were
        collected and, where applicable, for not less than one hundred and
        eighty (180) days or such longer period as may be prescribed under
        applicable law, including the directions issued by the Indian
        Computer Emergency Response Team (CERT-In). Thereafter, such
        records shall be securely deleted, anonymised, or archived in
        accordance with FamCare&rsquo;s data retention policies, unless
        their continued retention is required for any pending or
        anticipated legal proceeding, regulatory inquiry, investigation,
        audit, safety incident, law enforcement request, or other lawful
        purpose.
      </p>
      <p>
        7.4 Payment and financial records shall be retained in accordance
        with applicable tax, accounting, RBI, and payment-system
        requirements.
      </p>
      <p>
        7.5 Children&rsquo;s data shall be retained only for so long as
        necessary for the stated child-care purpose and shall be deleted
        when no longer required, subject to legal retention obligations.
      </p>
      <p>
        7.6 To the extent recognised under the DPDP Act, FamCare will
        support erasure of personal data that is no longer necessary for
        the purpose for which it was collected, subject to applicable
        legal exceptions. This may be described in practice as a right to
        erasure as provided under the DPDP Act or any other applicable
        law.
      </p>
      <p>
        7.7 Account Deletion Procedure &mdash; A User or Caregiver may
        request deletion of their account and Personal Data through the
        Platform, designated customer support channels, or by contacting
        the Grievance Officer. FamCare may verify the identity of the
        requester before processing such request. Deletion requests shall
        ordinarily be processed within a reasonable period, subject to
        applicable legal, contractual, regulatory, fraud prevention,
        audit, taxation, dispute resolution, or law enforcement
        obligations.
      </p>
      <p>
        7.8 Litigation Hold and Legal Preservation &mdash; Notwithstanding
        any request for deletion or erasure, FamCare may preserve Personal
        Data where such preservation is reasonably necessary for pending or
        anticipated litigation, arbitration, regulatory proceedings,
        investigations, law enforcement requests, audits, or compliance
        with applicable law.
      </p>

      <h2>viii. Security of Personal Data</h2>
      <p>
        8.1 FamCare implements reasonable security safeguards in accordance
        with the IT Act, SPDI Rules, DPDP Act, CERT-In Directions, and
        other applicable standards, including encryption in transit and at
        rest, access control, authentication safeguards, logging,
        monitoring, backup, and secure infrastructure management.
        Reportable cyber incidents shall be reported to CERT-In within the
        timelines prescribed under applicable law.
      </p>
      <p>
        8.2 Sensitive operations are protected by need-to-know access
        restrictions, role-based access controls, two-factor authentication
        where appropriate, regular security reviews, vulnerability
        assessments, and incident response procedures.
      </p>
      <p>
        8.3 FamCare maintains security measures to protect Children&rsquo;s
        data with heightened safeguards, restricted access, and additional
        oversight.
      </p>
      <p>
        8.4 In the event of a Personal Data Breach or any reportable cyber
        incident, FamCare shall take appropriate remedial measures and,
        where required under applicable law, notify the affected
        individuals and relevant authorities, including CERT-In and the
        Data Protection Board of India, within the prescribed timelines.
      </p>
      <p>
        8.5 No Absolute Security Guarantee: While FamCare implements
        reasonable and appropriate security safeguards, no method of
        transmission over the internet, electronic storage system, or
        security mechanism can be guaranteed to be completely secure.
        Accordingly, FamCare cannot guarantee absolute security of personal
        data.
      </p>
      <p>
        8.6 Internal Access Controls &mdash; Access to Personal Data shall
        be restricted to authorised employees, officers, contractors,
        consultants, interns, or service providers strictly on a
        need-to-know basis and only to the extent necessary for the
        performance of their authorised duties. Access rights shall be
        periodically reviewed and revoked when no longer required.
      </p>
      <p>
        8.7 Personal Data Breach Notification &mdash; Where a Personal Data
        Breach or reportable cyber security incident occurs, FamCare shall
        investigate the incident, implement appropriate remedial measures,
        and notify affected Data Principals, the appropriate regulatory
        authorities, and the Indian Computer Emergency Response Team
        (CERT-In), where required, within the timelines prescribed under
        applicable law.
      </p>

      <h2>ix. Rights of Data Principals</h2>
      <p>
        9.1 Right to access: you may request a summary of your personal
        data held by FamCare and information about categories of
        recipients with whom it has been shared, as permitted by law.
      </p>
      <p>
        9.2 Right to correction, completion, updating, and erasure: you may
        request correction of inaccurate or outdated data and erasure of
        personal data that is no longer necessary, subject to legal
        retention requirements.
      </p>
      <p>
        9.3 Right to grievance redressal: you may lodge a complaint with
        FamCare&rsquo;s Grievance Officer and, where applicable, with the
        Data Protection Board of India or other competent authority.
      </p>
      <p>
        9.4 Right to withdraw consent: where processing is based on
        consent, you may withdraw consent at any time by a reasonable and
        simple process. Withdrawal shall not affect the lawfulness of
        processing carried out before withdrawal. However, withdrawal of
        consent may result in FamCare being unable to provide certain
        services or features of the Platform, and FamCare shall inform the
        Data Principal of the consequences of such withdrawal at the time
        of the request.
      </p>
      <p>
        9.5 Right to nomination: you may nominate an individual to exercise
        your rights in accordance with applicable law in the event of your
        death or incapacity.
      </p>
      <p>
        9.6 Right against automated decision-making and profiling: To the
        extent required under applicable law, FamCare shall not subject
        Data Principals, including Children, to fully automated
        decision-making that produces legal or similarly significant
        effects without appropriate human oversight and safeguards as may
        be prescribed under applicable law.
      </p>
      <p>
        9.7 Procedure for Exercising Rights: Requests relating to access,
        correction, updating, erasure, withdrawal of consent, nomination,
        or any other rights available under applicable law may be
        submitted through the Platform, designated support channels, or by
        contacting the Grievance Officer. FamCare may require reasonable
        identity verification before processing such requests.
      </p>

      <h2>x. Children&rsquo;s Data and Special Protections</h2>
      <p>
        10.1 FamCare does not knowingly collect personal data directly from
        Children. Any data relating to a Child shall be provided by the
        Parent or Guardian with verifiable consent.
      </p>
      <p>
        10.2 FamCare shall collect only the minimum mandatory information
        necessary to identify the Child, provide childcare services, and
        ensure safety and security.
      </p>
      <p>
        10.3 FamCare shall ensure that any processing of Children&rsquo;s
        data is done in a manner that is verifiably safe, notice-based,
        transparent, and limited to the stated purpose. Section 9 of the
        DPDP Act also contemplates safe processing, subject to prescribed
        conditions and, in limited circumstances, government-notified
        exemptions.
      </p>
      <p>
        10.4 FamCare shall not process Children&rsquo;s data in a manner
        likely to cause any detrimental effect on the Child&rsquo;s
        well-being.
      </p>
      <p>
        10.5 FamCare shall not undertake tracking, behavioural monitoring,
        or targeted advertising directed at Children.
      </p>
      <p>
        10.6 FamCare shall not transfer Children&rsquo;s personal data
        unless permitted under applicable law and adequate safeguards.
      </p>
      <p>
        10.7 Processing of Children&rsquo;s data shall occur only after
        obtaining prior verifiable parental consent or lawful guardian
        consent, and only after reasonable age verification and
        relationship verification measures are completed.
      </p>
      <p>
        10.8 Children&rsquo;s Photographs and Media &mdash; Where Parents
        or Guardians voluntarily upload photographs, videos, medical
        instructions, or other information relating to a Child for service
        delivery, such information shall be used solely for providing
        childcare services, safety, identity verification, emergency
        response, or other stated purposes, and shall not be disclosed
        except as permitted under this Privacy Policy or applicable law.
      </p>

      <h2>xi. Cookies and Tracking Technologies</h2>
      <p>
        11.1 The Platform uses cookies, pixel tags, SDKs, and similar
        technologies to enable core functionality, improve performance,
        support security features, and analyse usage.
      </p>
      <p>
        11.2 Essential cookies required for platform operation cannot be
        disabled. Non-essential cookies may be managed through privacy
        settings, consent tools, or browser controls where available.
      </p>
      <p>
        11.3 FamCare does not knowingly share cookie data with advertising
        networks or data brokers for third-party ad monetisation.
      </p>
      <p>
        11.4 Push Notifications &mdash; FamCare may send transactional,
        safety-related, booking, payment, emergency, and service
        notifications through push notifications, SMS, email, telephone, or
        other communication channels. Promotional communications shall be
        sent only where permitted by applicable law and, where required,
        with the Data Principal&rsquo;s consent. Users may manage
        notification preferences through device settings or the Platform
        where available.
      </p>
      <p>
        11.5 Communication Service Providers &mdash; FamCare may engage
        authorised email delivery providers, SMS gateway providers, push
        notification service providers, customer support platforms, and
        other communication service providers for operational
        communications. Such providers shall process Personal Data solely
        for authorised purposes and subject to appropriate contractual and
        security obligations.
      </p>

      <h2>xii. Cross-Border Transfer of Data</h2>
      <p>12.1 FamCare primarily stores and processes personal data within India.</p>
      <p>
        12.2 Where cross-border transfer of personal data of adults is
        necessary and permitted by law, FamCare shall ensure that such
        transfer is consistent with the DPDP Act and any directions issued
        by the Central Government.
      </p>
      <p>
        12.3 Cloud Infrastructure and Data Localisation &mdash; While
        FamCare primarily stores Personal Data within India, certain cloud
        infrastructure providers may maintain encrypted backup, disaster
        recovery, redundancy, or mirrored infrastructure across multiple
        jurisdictions. Any such processing or storage shall be undertaken
        only in accordance with applicable law and appropriate
        contractual, technical, and organisational safeguards. Where
        Children&rsquo;s personal data is involved, FamCare shall use
        reasonable efforts to ensure that the primary storage of such data
        is within India, provided that transient processing, caching, or
        incidental access by cloud infrastructure providers shall not
        constitute a breach of this obligation, subject to applicable law.
      </p>

      <h2>xiii. Grievance Officer</h2>
      <p>
        13.1 FamCare has designated a Grievance Officer to address
        complaints relating to personal data and privacy.
      </p>
      <p>
        The Grievance Officer shall receive and acknowledge complaints
        relating to Personal Data, coordinate their investigation and
        resolution, maintain records of grievances and their disposal,
        ensure that grievances are redressed within the timelines
        prescribed under applicable law, including, where applicable, Rule
        5(9) of the Information Technology (Reasonable Security Practices
        and Procedures and Sensitive Personal Data or Information) Rules,
        2011, and act as the designated point of contact for communications
        with competent regulatory authorities.
      </p>

      <h2>xiv. Contact Details</h2>
      <ul>
        <li>
          <strong>Name:</strong> [Insert Name], Grievance Officer, FamCare
          Technologies Private Limited
        </li>
        <li>
          <strong>Email:</strong>{" "}
          <a href="mailto:support@famcare.co.in">support@famcare.co.in</a>
        </li>
        <li>
          <strong>Phone:</strong> <a href="tel:+919035272679">+91 90352 72679</a>
        </li>
        <li>
          <strong>Address:</strong> {ADDRESS}
        </li>
        <li>
          <strong>Response Time:</strong> Within 30 days of receipt, unless a
          shorter period is required by law.
        </li>
      </ul>

      <h2>xv. Court Orders, Government Directions, and Legal Compliance</h2>
      <p>
        15.1 FamCare shall comply with lawful orders issued by competent
        courts, tribunals, police authorities, regulators, or government
        agencies, subject to applicable law in India.
      </p>
      <p>
        15.2 Where disclosure is required by law, by court order, by a
        lawful government direction, or for emergency response, FamCare may
        disclose only such information as is reasonably necessary and
        legally required.
      </p>
      <p>
        15.3 FamCare may preserve, retain, or produce data as needed to
        comply with investigation, audit, enforcement, or litigation
        obligations.
      </p>

      <h2>xvi. Child Safety and Care Services Clause</h2>
      <p>
        16.1 For avoidance of doubt, when FamCare provides babysitting or
        child-care services, the assigned babysitter is a Caregiver acting
        in a caregiving role under this Policy.
      </p>
      <p>
        16.2 The Platform is intended to support safe in-home childcare by
        enabling scheduling, identity verification, session management, and
        emergency response features.
      </p>
      <p>
        16.3 This Policy shall be read alongside any additional
        service-specific child safety notices, parental consent forms, and
        operational safety guidelines.
      </p>
      <p>
        16.4 Artificial Intelligence-Assisted Services &mdash; FamCare may,
        in the future, deploy artificial intelligence or machine learning
        tools to assist in caregiver matching, scheduling, fraud detection,
        service recommendations, operational efficiency, or customer
        support. Such tools shall function only as decision-support
        mechanisms and shall not constitute fully automated decision-making
        producing legal or similarly significant effects on Data Principals
        without appropriate human oversight and compliance with applicable
        law.
      </p>
      <p>
        16.5 CCTV and Visual Evidence &mdash; Where CCTV recordings,
        photographs, videos, or other visual evidence are voluntarily
        submitted by Users or Caregivers for safety verification, complaint
        investigation, dispute resolution, incident reporting, insurance
        claims, or legal compliance, such material shall be processed only
        for the relevant purpose, retained for an appropriate period, and
        protected in accordance with this Privacy Policy and applicable
        law.
      </p>

      <h2>xvii. Amendments</h2>
      <p>
        17.1 FamCare may amend this Policy from time to time to reflect
        changes in law, operational practices, or business requirements.
      </p>
      <p>
        17.2 Material changes shall be communicated through the Platform,
        email, or other reasonable notice mechanisms with reasonable
        advance notice before becoming effective, or such shorter period as
        may be required by law or necessitated by urgent legal, regulatory,
        or safety considerations.
      </p>
      <p>
        17.3 Continued use of the Platform after the effective date of a
        revised Policy constitutes acceptance of the revised terms to the
        extent permitted by law. Where any material change affects the
        scope, purpose, or nature of processing of Personal Data in a
        manner that requires fresh consent under the DPDP Act, FamCare
        shall use reasonable efforts to obtain such consent before the
        revised terms take effect, and continued use of the Platform
        following receipt of such notice shall constitute consent to the
        extent permitted under applicable law.
      </p>

      <p className="pt-4 text-sm text-ink-faint">Updated Date: August 2026</p>
    </LegalPage>
  );
}
