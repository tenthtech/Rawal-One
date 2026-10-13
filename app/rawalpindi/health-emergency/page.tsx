import type { Metadata } from "next";
import { ExternalArrow } from "@/components/city/external-arrow";
import Link from "next/link";

import { CityPageIntro } from "@/components/city/city-page-intro";
import { CityContextNote, CitySources } from "@/components/city/city-sources";
import { emergencyServices, hospitals } from "@/data/rawalpindi/health";

import styles from "@/components/city/health-safety.module.css";

export const metadata: Metadata = {
  title: "Hospitals & emergency | Know Rawalpindi",
  description:
    "Official emergency contacts and a concise directory of major Rawalpindi hospitals, with sources and last-checked information.",
};

export default function HealthEmergencyPage() {
  return (
    <>
      <CityPageIntro
        eyebrow="Health & emergency"
        title="Hospitals & emergency"
        description="Find emergency contacts and official information about major hospitals serving Rawalpindi."
        sections={[
          { href: "#emergency-numbers", label: "Emergency numbers" },
          { href: "#major-hospitals", label: "Major hospitals" },
        ]}
      />

      <section id="emergency-numbers" className={styles.emergencySection} aria-labelledby="emergency-numbers-heading">
        <div className="civic-container">
          <div className={styles.sectionIntro}>
            <div>
              <p className="civic-eyebrow">Official emergency services</p>
              <h2 id="emergency-numbers-heading" className="civic-heading mt-2">Emergency numbers</h2>
            </div>
            <p>These contacts belong to Punjab’s emergency services. Rawal One does not operate these services.</p>
          </div>
          <div className={styles.emergencyContacts}>
            {emergencyServices.map((service) => (
              <article key={service.id} id={service.id} className={styles.emergencyContact}>
                <h3>{service.title}</h3>
                <a href={`tel:${service.tel}`} className={styles.emergencyNumber} aria-label={`Call ${service.title} on ${service.number}`}>
                  <span>{service.number}</span>
                  <span className={styles.callLabel}>Call {service.title}<span aria-hidden="true"> →</span></span>
                </a>
                <p>{service.description}</p>
              </article>
            ))}
          </div>
          <CitySources ids={["rescue-number", "rescue-remit", "police-emergency"]} className="mt-7" />
        </div>
      </section>

      <section id="major-hospitals" className={styles.hospitalSection} aria-labelledby="major-hospitals-heading">
        <div className="civic-container">
          <div className={styles.sectionIntro}>
            <div>
              <p className="civic-eyebrow">Health institutions</p>
              <h2 id="major-hospitals-heading" className="civic-heading mt-2">Major hospitals</h2>
            </div>
            <p>Follow the official links for hospital information. Contact details below are general enquiries, rather than emergency dispatch.</p>
          </div>
          <ul className={styles.hospitals}>
            {hospitals.map((hospital) => (
              <li key={hospital.id}>
                <article id={`hospital-${hospital.id}`} className={styles.hospital} data-hospital-entry>
                  <div className={styles.hospitalIdentity}>
                    <p className={styles.category}>{hospital.category}</p>
                    <h3>{hospital.title}</h3>
                    <p className={styles.location}>{hospital.location}</p>
                  </div>
                  <p className={styles.hospitalDescription}>{hospital.description}</p>
                  <div className={styles.hospitalLinks}>
                    {hospital.website ? (
                      <a href={hospital.website} className="civic-link">
                        {hospital.id === "rawalpindi-institute-of-cardiology" ? "Visit the RIC website" : "Punjab health directory"}
                        <span className="sr-only"> for {hospital.title}</span>
                        <ExternalArrow />
                      </a>
                    ) : null}
                    {hospital.phone && hospital.tel ? (
                      <div className={styles.generalPhone}>
                        <span>General enquiries</span>
                        <a href={`tel:${hospital.tel}`} className="civic-link" aria-label={`${hospital.title} general enquiries: ${hospital.phone}`}>{hospital.phone}</a>
                      </div>
                    ) : null}
                  </div>
                </article>
              </li>
            ))}
          </ul>
          <CitySources ids={["punjab-tertiary", "ric-about", "ric-contact"]} className="mt-7" />
          <p className={styles.note}>This directory provides reference information, rather than medical advice or live hospital availability.</p>
          <Link href="/rawalpindi/public-safety" className="civic-link mt-3">Find a police station<span aria-hidden="true"> →</span></Link>
        </div>
      </section>
      <CityContextNote />
    </>
  );
}
