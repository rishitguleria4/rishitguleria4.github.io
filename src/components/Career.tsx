import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          Education <span>&</span>
          <br /> Achievements
        </h2>
        <div className="career-info">
          <div className="career-timeline"></div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Codeforces & LeetCode</h4>
                <h5>Algorithms & Data Structures</h5>
              </div>
              <h3>NOW</h3>
            </div>
            <p>
              Solved 500+ problems across Codeforces and LeetCode. Maintained a 103-day continuous problem-solving streak on Codeforces, showcasing consistent dedication to algorithmic efficiency and competitive programming.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>BCA (Artificial Intelligence)</h4>
                <h5>Rayat Bahra University</h5>
              </div>
              <h3>2027</h3>
            </div>
            <p>
              Expected graduation July 2027. Relevant coursework includes Data Structures & Algorithms, Systems Architecture, Linear Algebra, and Probability & Statistics.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Shishu Niketan</h4>
                <h5>Senior Secondary School</h5>
              </div>
              <h3>2024</h3>
            </div>
            <p>
              Class XII Completed (2023 - 2024). Class X Completed (2021 - 2022).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
