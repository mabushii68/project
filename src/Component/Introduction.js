import profileImg from "../assets/profile.jpg";

export default function Introduction() {
  const profile = {
    nameKr: "김정준",
    nameEn: "Kim JungJoon",
    title: "Technical Artist",
    major: "가천대학교 컴퓨터공학전공",
    grade: "3학년",
    email: "ogoo0608@gachon.ac.kr",
    interests: "Game Client Development, Graphics, 3D Modeling",
    goal: "Technical Artist로 성장하기",
  };

  return (
    <div className="intro-page">
      {}
      <section className="intro-hero">
        <div className="intro-hero-bg" />

        <div className="intro-profile-card">
          <div className="intro-photo" style={{ backgroundImage: `url(${profileImg})` }}
/>


          <div className="intro-info">
            <p className="intro-label">Portfolio</p>
            <h1 className="intro-name">
              {profile.nameKr}
              <span className="intro-name-en"> ({profile.nameEn})</span>
            </h1>
            <p className="intro-role">{profile.title}</p>

            <dl className="intro-meta">
              <div className="intro-meta-row">
                <dt>전공</dt>
                <dd>{profile.major}</dd>
              </div>
              <div className="intro-meta-row">
                <dt>학년</dt>
                <dd>{profile.grade}</dd>
              </div>
              <div className="intro-meta-row">
                <dt>이메일</dt>
                <dd>{profile.email}</dd>
              </div>
              <div className="intro-meta-row">
                <dt>관심분야</dt>
                <dd>{profile.interests}</dd>
              </div>
              <div className="intro-meta-row">
                <dt>목표</dt>
                <dd>{profile.goal}</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      {/* 아래 자기소개 영역 */}
      <section className="intro-about card">
        <h2>안녕하세요!</h2>
        <p>
          게임 클라이언트 개발과 그래픽스, 3D 모델링에 관심이 많은 컴퓨터공학 전공
          김정준입니다. 실시간 렌더링과 게임 아트를 연결하는 테크니컬 아티스트를 목표로
          Unity, Unreal Engine, Blender, Substance 3D Painter 등을 공부하고 있습니다.
          실제 프로젝트와 공모전 경험을 통해 게임 클라이언트 프로그래밍과 레벨 디자인,
          테크니컬 아트 역량을 함께 키워가고 있습니다.
        </p>
      </section>
    </div>
  );
}
