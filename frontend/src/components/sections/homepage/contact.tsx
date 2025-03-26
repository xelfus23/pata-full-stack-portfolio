import { motion } from "motion/react";
import Section from "../../ui/section";
import PrimaryButton from "@/components/ui/button/primaryButton";
import React from "react";
import { useRouter } from "next/navigation";

const Contact: React.FC = () => {
    const router = useRouter();

    return (
        <Section
            id="contact"
            title="Contact Me"
            subtitle="Get in touch for collaborations or inquiries"
        >
            <div className="grid md:grid-cols-2 gap-12">
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                    className="space-y-6"
                >
                    <h3 className="text-2xl font-semibold text-primary">
                        Let&apos;s Talk
                    </h3>
                    <p className=" text-text/90">
                        I&apos;m interested in freelance opportunities,
                        especially ambitious or large projects. However, if you
                        have other requests or questions, don&apos;t hesitate to
                        contact me.
                    </p>

                    <div className="space-y-4">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center text-primary">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="20"
                                    height="20"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                                    <polyline points="22,6 12,13 2,6"></polyline>
                                </svg>
                            </div>
                            <div>
                                <h4 className="text-text font-medium">Email</h4>
                                <a
                                    href="mailto:your.email@example.com"
                                    className="text-primary hover:text-primary/80 transition-colors duration-300"
                                >
                                    patrick.medenilla23@gmail.com
                                </a>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center text-primary">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="20"
                                    height="20"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M15.05 5A5 5 0 0 1 19 8.95M15.05 1A9 9 0 0 1 23 8.94m-1 7.98v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                                </svg>
                            </div>
                            <div>
                                <h4 className="text-text font-medium">Phone</h4>
                                <a
                                    href="tel:+1234567890"
                                    className="text-primary hover:text-primary/80 transition-colors duration-300"
                                >
                                    +63 916 331 8032
                                </a>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center text-primary">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="20"
                                    height="20"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                                </svg>
                            </div>
                            <div>
                                <h4 className="text-text font-medium">
                                    GitHub
                                </h4>
                                <a
                                    href="https://github.com/xelfus23"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-primary hover:text-primary/80 transition-colors duration-300"
                                >
                                    github.com/xelfus23
                                </a>
                            </div>
                        </div>
                    </div>

                    <PrimaryButton
                        label="Contact me"
                        type="button"
                        onClick={() => router.push("/contact")}
                    />
                </motion.div>
            </div>
        </Section>
    );
};

export default Contact;
