import './Login.css';
import kakaoImg from '../assets/images/kakao_logo.png';
import naverImg from '../assets/images/naver_logo.png';
import googleImg from '../assets/images/google_logo.png';



function Login() {
    const handleLoginBtn = (option) => {
        let url = '';
        switch(option) {
            case 'kakao':
                url = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${import.meta.env.VITE_APP_KAKAO_CLIENT_ID}&redirect_uri=${import.meta.env.VITE_APP_KAKAO_REDIRECT_URI}`;
                break;
            case 'naver':
                url = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${import.meta.env.VITE_APP_NAVER_CLIENT_ID}&redirect_uri=${import.meta.env.VITE_APP_NAVER_REDIRECT_URI}`;
                break;
            case 'google':
                url = `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=${import.meta.env.VITE_APP_GOOGLE_CLIENT_ID}&redirect_uri=${import.meta.env.VITE_APP_GOOGLE_REDIRECT_URI}&scope=https://www.googleapis.com/auth/userinfo.email`;

        }
        window.location.href = url;
    }
    return (
        <main className='login-main'>
            <section className='login-content'>
                <section className='login-content-left'>
                    <span>kmu</span>
                    <span>toktok-.</span>
                </section>
                <div className='separator'></div>
                <section className='login-content-right'>
                    <h2>로그인</h2>
                    <ul>
                        <li className='kakao-login-btn' onClick={() => handleLoginBtn('kakao')}>
                            <img src={kakaoImg} alt='' />
                        </li>
                        <li className='naver-login-btn' onClick={()=> handleLoginBtn('naver')}>
                            <img src={naverImg} alt='' />
                        </li>
                        <li className='google-login-btn' onClick={()=> handleLoginBtn('google')}>
                            <img src={googleImg} alt='' />
                        </li>
                    </ul>
                    <a id="mailBtn" href="#">문의하기</a>
                </section>
            </section>
        </main>
    );
}

export default Login;