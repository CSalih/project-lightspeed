# Project Lightspeed

A regional electricity provider decides to reset how it relates to customers, starting
from a blank slate. Bills feel opaque, outages feel silent,
and the energy transition feels confusing; trust is the real deficit. The mandate is a
single, honest front door that makes every interaction simple
and timely: clear bills, proactive outage updates, and confident choices about tariffs,
EVs, and solar. The destination is a relationship where customers
feel informed and in control, and the utility is seen as a steady partner rather than a
distant monopoly.

## Functional

FR1 – Outage Communication (Must Have)
The application shall provide customers with information about planned outages affecting
their service area, including: Date and time of the outage, Expected duration, Affected
area, Reason for the outage (if available)
, Maintenance or service messages related to the outage and, in the case of unplanned
outages service communication about estimated downtime and reason for the outage (if
available)

FR1.1 – Outage Notification (Must Have)
The application shall provide advance notification to customers affected by a planned
outage before the outage occurs. This shall be displayed as a visible notification on the
customer Dashboard

---
FR2 – Push Notification Support (Could Have)
The application shall support push notifications or SMS alerts for important customer
events, including planned outages, active outages, outage restoration, new bills, and
significant changes in energy consumption or billing.

---
FR3 – Billing History Overview (Must Have)
The application shall provide customers with access to their billing history, allowing
them to:
-FR3.1: Sortable view of past bills including information about dates and payment status
-FR3.2: Download bills (individually and for a given timeframe)

---
FR4 – Bill Overview (Must Have)
The application shall provide customers with a detailed and easy-to-understand explanation
of each bill.
At a minimum the application shall display and provide contextual explanation for:

- Total amount due
- Energy consumption charges
- Grid/network charges
- Taxes and fees
- Discounts or credits
- Comparison with previous billing periods

---
FR5 – Tariff and Contract Overview (Must Have)
The application shall provide customers with an overview of their current tariff and
contract details.
At a minimum the application shall display:

- Current tariff plan
- Price per kWh
- Contract terms
- Contract start and renewal dates

---
FR6 – Energy Consumption Monitoring (Must Have)
The application shall provide customers with an overview of their energy consumption.
At a minimum the application shall display:

- Daily consumption
- Weekly consumption
- Monthly consumption
- Historical trends
- Peak consumption periods

---
FR7 – Tariff Comparison and Recommendations (Could Have)
-FR7.1: The application shall allow customers to compare available tariff plans.
-FR7.2: The application shall provide personalized recommendations based on the customer's
consumption patterns.
-FR7.3: The application shall estimate potential savings for alternative plans.

---
FR8 – Energy Grid Monitoring (Must Have)
If the customer owns a solar installation, the application shall provide information
about:

- Current energy production
- Historical production
- Energy exported to the grid
- Energy imported from the grid
- Financial credits received
- Accumulated energy balance

---
FR9 – Customer Support (Should Have)
The application shall provide customers with a single centralized "front door" for all
customer interactions and support services, replacing the need for separate portals.
At a minimum the application shall allow customers to:
-FR9.1: Submit support tickets
-FR9.2: Report issues
-FR9.3: Track support requests
-FR9.4: Access frequently asked questions

---
FR10 - Quarterly Market Insights (Could Have)
Interactive quarterly reports visualizing global energy drivers and their direct impact on
local pricing.

---
FR11 – Energy Transition Information Hub (Could Have)
The application shall provide educational information regarding energy transition
technologies and programs along with personalized recommendations to reduce energy
consumption.
At a minimum this shall include information about:

- Solar panels
- Electric vehicles
- Home batteries
- Energy efficiency measures
- Renewable energy programs
- Government incentives and subsidies

## NON-Functional

NFR1 – Usability (Must Have)
The application shall provide an intuitive and user-friendly interface that enables
customers to access billing, outage, and tariff information without requiring training.The
guiding objective is that the visualization on the application feels more informative then
just reading the bills on paper (CSAT , customer perception?)

NFR1.1 – Readability (Must Have)
Billing, tariff, and outage information shall be presented in clear, non-technical
language understandable to non-expert users.

NFR2 – Availability (Must Have)
The application must maintain extremely high uptime (e.g., 99.9%).

NR3 – Correctness (Must Have)
Outage and billing information displayed by the application shall accurately reflect the
latest data available from the internal utility systems.

NR4 – Maintainability and Scalability (Must Have)
The application is implemented using good practices of the language used and a Modular
architecture for efficient integration of additions of tariffs, renewable energy services,
customer communication features and grid scaling.

NFR5 – Reliability (Must Have)
The application stays online and is able to handle traffic spikes during regional
blackouts.

NFR6 – Performance (Must Have)
All views must load and render visualizations within two seconds.

NFR7 – Performance (Must Have)
The application shall support increased customer traffic during large-scale outage events
without significant degradation of performance (+2 seconds).

NFR8 – Privacy (Must Have)
The application shall process and store customer information in compliance with applicable
data protection regulations (GDPR).

NFR9 – Security (Must Have)
The application shall require authenticated access to customer-specific information and
protect all customer data against unauthorized access.

NFR10 – Timeliness of Updates (Must Have)
The application shall publish outage status updates within 5 minutes of receiving updated
information from operational systems.

NFR11 – Accessibility (Could Have)
The application shall comply with WCAG 2.1 Level AA accessibility standards.

NFR12 – Portability (Should Have)
The application shall provide a consistent user experience across desktop, tablet, and
mobile devices.

NFR13 – Notification Timeliness (Should Have)
The application shall deliver critical outage notifications to subscribed customers within
1 minute of generation.




