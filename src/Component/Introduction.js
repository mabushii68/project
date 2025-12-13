import profileImg from "../assets/profile.jpg";
import AnimatedSection from './AnimatedSection';

export default function Introduction() {
  /* 자기소개에 사용될 프로필 정보 객체 */
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
      {/* 메인 프로필 영역: 스크롤 진입 시 페이드 인 애니메이션 적용 */}
      <AnimatedSection animationClass="fade-in">
        <section className="intro-hero">
          <div className="intro-hero-bg" />

          <div className="intro-profile-card">
            {/* 프로필 이미지를 배경 이미지 형태로 적용 */}
            <div
              className="intro-photo"
              style={{ backgroundImage: `url(${profileImg})` }}
            />

            <div className="intro-info">
              <p className="intro-label">Portfolio</p>
              <h1 className="intro-name">
                {profile.nameKr}
                <span className="intro-name-en"> ({profile.nameEn})</span>
              </h1>
              <p className="intro-role">{profile.title}</p>

              {/* 프로필 세부 정보를 정의 리스트 형태로 출력 */}
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
      </AnimatedSection>

      {/* 자기소개 텍스트 영역: 하단에서 위로 슬라이드 애니메이션 적용 */}
      <AnimatedSection animationClass="slide-up">
        <section className="intro-about card">
          <h2>안녕하세요!</h2>
          <h3>C++, C#, Unity, Unreal Engine, Blender, Substance 3D Painter</h3>
          <p>
            게임 클라이언트 개발과 그래픽스, 3D 모델링에 관심이 많은 컴퓨터공학전공
            김정준입니다.
            <br />
            테크니컬 아티스트를 목표로
            언리얼 엔진, 유니티, 블렌더, 서브스턴스 3D 페인터 등을 공부하고 있습니다.
            <br />
            프로젝트와 공모전 경험을 통해 게임 클라이언트 프로그래밍과 레벨 디자인,
            테크니컬 아트 역량을 함께 키워가고 있습니다.
          </p>
        </section>
      </AnimatedSection>
    </div>
  );
}
