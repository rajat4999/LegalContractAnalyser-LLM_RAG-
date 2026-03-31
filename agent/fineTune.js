export const fewExamples = `
Clause: Vendor must pay penalty if delivery is delayed
Output: {"name":"Penalty Clause","risk_score":0.9,"importance":0.85,"reason":"Penalty imposes financial risk"}

Clause: Late payment incurs 12% interest
Output: {"name":"Late Payment Interest","risk_score":0.8,"importance":0.85,"reason":"Interest penalty increases financial burden"}

Clause: Either party may terminate with 30 days notice
Output: {"name":"Termination Notice","risk_score":0.6,"importance":0.9,"reason":"Termination impacts contract continuity"}

Clause: Company can terminate immediately for breach
Output: {"name":"Immediate Termination","risk_score":0.9,"importance":0.95,"reason":"Strict termination creates high risk"}

Clause: The vendor shall indemnify client against all losses
Output: {"name":"Indemnity Clause","risk_score":0.95,"importance":0.95,"reason":"Transfers full financial liability"}

Clause: Company is not liable for indirect damages
Output: {"name":"Limitation of Liability","risk_score":0.85,"importance":0.9,"reason":"Shifts risk to other party"}

Clause: Disputes resolved via arbitration
Output: {"name":"Dispute Resolution","risk_score":0.4,"importance":0.7,"reason":"Moderate impact on conflict handling"}

Clause: Agreement governed by Indian law
Output: {"name":"Governing Law","risk_score":0.2,"importance":0.3,"reason":"Informational clause"}

Clause: Vendor must maintain confidentiality
Output: {"name":"Confidentiality Clause","risk_score":0.6,"importance":0.8,"reason":"Important obligation with moderate risk"}

Clause: Contract duration is 12 months
Output: {"name":"Duration Clause","risk_score":0.3,"importance":0.7,"reason":"Defines timeline with low risk"}

Clause: Payment must be made within 15 days
Output: {"name":"Payment Terms","risk_score":0.5,"importance":0.9,"reason":"Critical obligation with moderate risk"}

Clause: Automatic renewal unless terminated
Output: {"name":"Auto Renewal","risk_score":0.7,"importance":0.8,"reason":"May create unintended obligations"}

Clause: Vendor responsible for all damages
Output: {"name":"Liability Clause","risk_score":0.9,"importance":0.9,"reason":"Assigns full risk to vendor"}

Clause: Notices sent via email
Output: {"name":"Notice Procedure","risk_score":0.2,"importance":0.5,"reason":"Procedural clause"}

Clause: Contractor must follow safety regulations
Output: {"name":"Compliance Clause","risk_score":0.6,"importance":0.8,"reason":"Regulatory obligation"}

Clause: Client can audit vendor records
Output: {"name":"Audit Rights","risk_score":0.5,"importance":0.7,"reason":"Oversight clause with moderate impact"}

Clause: Vendor must insure against losses
Output: {"name":"Insurance Clause","risk_score":0.6,"importance":0.8,"reason":"Risk mitigation but adds obligation"}

Clause: Delay due to force majeure not penalized
Output: {"name":"Force Majeure","risk_score":0.3,"importance":0.7,"reason":"Reduces risk under uncontrollable events"}

Clause: Employee must follow company policies
Output: {"name":"Policy Compliance","risk_score":0.4,"importance":0.6,"reason":"General obligation"}

Clause: Contract cannot be assigned without consent
Output: {"name":"Assignment Clause","risk_score":0.5,"importance":0.7,"reason":"Restricts transfer of obligations"}

Clause: Payment in installments
Output: {"name":"Installment Payment","risk_score":0.5,"importance":0.8,"reason":"Structured payment obligation"}

Clause: Vendor must meet delivery deadlines
Output: {"name":"Delivery Obligation","risk_score":0.6,"importance":0.8,"reason":"Operational risk if unmet"}

Clause: Data must not be shared externally
Output: {"name":"Data Protection","risk_score":0.7,"importance":0.85,"reason":"Critical confidentiality requirement"}

Clause: Breach leads to contract termination
Output: {"name":"Breach Consequence","risk_score":0.85,"importance":0.9,"reason":"Severe consequence increases risk"}

Clause: Client may withhold payment for defects
Output: {"name":"Payment Withholding","risk_score":0.7,"importance":0.85,"reason":"Financial control risk"}

Clause: Vendor must provide warranty
Output: {"name":"Warranty Clause","risk_score":0.6,"importance":0.8,"reason":"Obligation adds liability"}

Clause: No partnership is created
Output: {"name":"Non-Partnership Clause","risk_score":0.2,"importance":0.4,"reason":"Clarification clause"}

Clause: Taxes to be paid by vendor
Output: {"name":"Tax Responsibility","risk_score":0.7,"importance":0.85,"reason":"Financial burden clause"}

Clause: Services must meet quality standards
Output: {"name":"Quality Assurance","risk_score":0.6,"importance":0.8,"reason":"Operational requirement"}

Clause: Subcontracting requires approval
Output: {"name":"Subcontracting Clause","risk_score":0.5,"importance":0.7,"reason":"Control over delegation"}

Clause: Confidential data must be encrypted
Output: {"name":"Data Security","risk_score":0.7,"importance":0.85,"reason":"Security obligation increases importance"}

Clause: Payment subject to milestone completion
Output: {"name":"Milestone Payment","risk_score":0.6,"importance":0.85,"reason":"Conditional payment risk"}

Clause: Termination requires written notice
Output: {"name":"Termination Process","risk_score":0.4,"importance":0.8,"reason":"Procedural but important"}

Clause: Vendor liable for third-party claims
Output: {"name":"Third-party Liability","risk_score":0.9,"importance":0.9,"reason":"Extends liability risk"}

Clause: Intellectual property belongs to client
Output: {"name":"IP Ownership","risk_score":0.8,"importance":0.9,"reason":"Critical ownership clause"}

Clause: Contractor must meet deadlines strictly
Output: {"name":"Strict Deadline","risk_score":0.7,"importance":0.8,"reason":"Strict obligation increases risk"}

Clause: Service levels must be maintained
Output: {"name":"Service Level Agreement","risk_score":0.6,"importance":0.85,"reason":"Performance requirement"}

Clause: Breach results in financial damages
Output: {"name":"Damage Clause","risk_score":0.9,"importance":0.9,"reason":"Direct financial penalty"}

Clause: Agreement may be extended mutually
Output: {"name":"Extension Clause","risk_score":0.3,"importance":0.6,"reason":"Low risk flexibility"}

Clause: Vendor must provide reports monthly
Output: {"name":"Reporting Requirement","risk_score":0.4,"importance":0.6,"reason":"Operational obligation"}

Clause: Customer data cannot be stored externally
Output: {"name":"Data Storage Restriction","risk_score":0.7,"importance":0.85,"reason":"Compliance risk"}

Clause: Delay penalties capped at 5%
Output: {"name":"Penalty Cap","risk_score":0.6,"importance":0.75,"reason":"Limits financial risk"}

Clause: Agreement effective upon signature
Output: {"name":"Effective Date","risk_score":0.2,"importance":0.5,"reason":"Informational timing clause"}

Clause: Vendor must resolve issues within 24 hours
Output: {"name":"Resolution SLA","risk_score":0.6,"importance":0.8,"reason":"Strict service obligation"}

Clause: Contract may be terminated for convenience
Output: {"name":"Termination for Convenience","risk_score":0.7,"importance":0.9,"reason":"One-sided termination risk"}

Clause: Vendor must comply with all laws
Output: {"name":"Legal Compliance","risk_score":0.6,"importance":0.85,"reason":"Mandatory legal obligation"}

Clause: No waiver unless written
Output: {"name":"No Waiver Clause","risk_score":0.3,"importance":0.5,"reason":"Standard legal protection"}

Clause: Disputes handled in specific court
Output: {"name":"Jurisdiction Clause","risk_score":0.4,"importance":0.7,"reason":"Legal control clause"}
`;