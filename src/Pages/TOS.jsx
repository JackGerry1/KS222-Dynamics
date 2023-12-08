// TOS.jsx
// URL: https://www.termsofservicegenerator.net/ Accessed: 1/12/23

import React from "react";
import { Link } from "react-router-dom";
import "../index.css";
import "../TOS.css";

const TOS = () => {
  return (
    <div className="page-container">
      <div className="terms-box">
        <div className="terms-text">
          <h2>Terms Of Service</h2>
          <p>Last Edit: 27/11/2023</p>
          <p>Greetings Users.</p>
          <h3>1. Terms</h3>
          <p>
            By accessing this Website, accessible from Website.com, you are
            agreeing to be bound by these Website Terms and Conditions of Use
            and agree that you are responsible for the agreement with any
            applicable local laws. If you disagree with any of these terms, you
            are prohibited from accessing this site. The materials contained in
            this Website are protected by copyright and trade mark law.
          </p>
          <h3>2. Use License</h3>
          <p>
            Permission is granted to temporarily download one copy of the
            materials on KS222 Dynamic Chat App's Website for personal,
            non-commercial transitory viewing only. This is the grant of a
            license, not a transfer of title, and under this license you may
            not:
          </p>
          <ul>
            <li>modify or copy the materials;</li>
            <li>
              use the materials for any commercial purpose or for any public
              display;
            </li>
            <li>
              attempt to reverse engineer any software contained on KS222
              Dynamic Chat App's Website;
            </li>
            <li>
              remove any copyright or other proprietary notations from the
              materials;
            </li>
            <li>
              or transfer the materials to another person or "mirror" the
              materials on any other server.
            </li>
          </ul>
          <h3>3. Disclaimer</h3>
          <p>
            This will let KS222 Dynamic Chat App to terminate upon violations of
            any of these restrictions. Upon termination, your viewing right will
            also be terminated and you should destroy any downloaded materials
            in your possession whether it is printed or electronic format.
          </p>
          <p>
            All the materials on KS222 Dynamic Chat App's Website are provided
            “as is”. KS222 Dynamic Chat App makes no warranties, may it be
            expressed or implied, therefore negates all other warranties.
            Furthermore, KS222 Dynamic Chat App does not make any
            representations concerning the accuracy or reliability of the use of
            the materials on its Website or otherwise relating to such materials
            or any sites linked to this Website.
          </p>
          <h3>4. Limitations</h3>
          <p>
            KS222 Dynamic Chat App or its suppliers will not be hold accountable
            for any damages that will arise with the use or inability to use the
            materials on KS222 Dynamic Chat App's Website, even if KS222 Dynamic
            Chat App or an authorize representative of this Website has been
            notified, orally or written, of the possibility of such damage. Some
            jurisdiction does not allow limitations on implied warranties or
            limitations of liability for incidental damages, these limitations
            may not apply to you.
          </p>
          <h3>5. Revisions and Errata</h3>
          <p>
            The materials appearing on KS222 Dynamic Chat App's Website may
            include technical, typographical, or photographic errors. KS222
            Dynamic Chat App will not promise that any of the materials in this
            Website are accurate, complete, or current. KS222 Dynamic Chat App
            may change the materials contained on its Website at any time
            without notice. KS222 Dynamic Chat App does not make any commitment
            to update the materials.
          </p>
          <h3>6. Links</h3>
          <p>
            KS222 Dynamic Chat App has not reviewed all of the sites linked to
            its Website and is not responsible for the contents of any such
            linked site. The presence of any link does not imply endorsement by
            KS222 Dynamic Chat App of the site. The use of any linked website is
            at the user's own risk.
          </p>
          <h3>7. Site Terms of Use Modifications</h3>
          <p>
            KS222 Dynamic Chat App may revise these Terms of Use for its Website
            at any time without prior notice. By using this Website, you are
            agreeing to be bound by the current version of these Terms and
            Conditions of Use.
          </p>
          <h3>8. Governing Law</h3>
          <p>
            Any claim related to KS222 Dynamic Chat App's Website shall be
            governed by the laws of Country without regards to its conflict of
            law provisions.
          </p>
          <div className="settings-content">
          <Link className="change-button" to="/">
            Home
          </Link>
        </div>
        </div>
      </div>
    </div>
  );
};

export default TOS;
