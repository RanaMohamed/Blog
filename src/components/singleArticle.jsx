import React from 'react';
import { Link } from 'react-router-dom';

function SingleArticle() {
  return (
    <React.Fragment>
      <section className='cover-section cover-section--img'>
        <div
          className='cover-section__content'
          style={{
            backgroundImage:
              "url('https://mksdmcdn-9b59.kxcdn.com/typology/wp-content/uploads/2017/01/tpology30-1920x815.jpg')",
          }}
        >
          <div className='container text-center'>
            <h1 className=''>KNIGHTS, I BID YOU WELCOME TO YOUR NEW HOME</h1>
            <div className=''>
              By{' '}
              <Link to='/profile' className='underline-link'>
                Madison Barnett
              </Link>{' '}
              / February 16, 2020
            </div>
          </div>
        </div>
      </section>
      <section className='main-section'>
        <div className='container'>
          <div className='article'>
            <div className='article__body'>
              <p>
                Uniquely monetize virtual leadership skills vis-a-vis parallel
                materials. Dramatically disintermediate excellent manufactured
                products for innovative partnerships. Enthusiastically exploit
                standards compliant customer service for premium initiatives.
                Phosfluorescently administrate best-of-breed content after
                granular experiences. Phosfluorescently redefine enterprise
                e-services with real-time outsourcing.
              </p>
              <p>
                Rapidiously brand quality meta-services rather than distributed
                bandwidth. Interactively disintermediate economically sound
                e-services and intuitive internal or “organic” sources. Credibly
                expedite multidisciplinary processes for tactical information.
                Uniquely incubate interoperable communities with flexible
                solutions. Conveniently recaptiualize virtual testing procedures
                vis-a-vis open-source products.
              </p>
              <h2>CONTINUALLY DRIVE LEADING EDGE MODELS</h2>
              <p>
                Monotonectally negotiate backward-compatible methods of
                empowerment through next-generation meta-services. Assertively
                e-enable efficient e-tailers with backend strategic theme areas.
                Phosfluorescently underwhelm mission-critical best practices for
                fully researched human capital. Progressively embrace holistic
                expertise after magnetic services. Completely impact global
                action items via focused total linkage.
              </p>
              <blockquote>
                Progressively productize premium strategic theme areas without
                viral architectures. Rapidiously develop revolutionary markets
                whereas bleeding-edge results. Interactively streamline
                user-centric scenarios through just in time portals.
              </blockquote>
              <p>
                Energistically maximize holistic sources for efficient data.
                Competently deliver backward-compatible resources for
                principle-centered results. Dynamically scale cross-unit
                relationships for client-focused growth strategies.
                Professionally pontificate open-source ideas and vertical
                markets. Uniquely develop open-source experiences whereas
                orthogonal manufactured products.
              </p>
              <h2>SEAMLESSLY EMBRACE COOPERATIVE MARKETS</h2>
              <p>
                Distinctively transition premium synergy whereas sticky human
                capital. Authoritatively re-engineer customized results through
                best-of-breed catalysts for change. Appropriately promote
                effective ROI without value-added infrastructures. Rapidiously
                embrace state of the art ROI after open-source customer service.
                Synergistically parallel task extensible infomediaries and
                scalable supply chains.
              </p>
            </div>
            <div className='article__tags'>
              <a href='/' className='tag color-link'>
                material
              </a>
              <a href='/' className='tag color-link'>
                noimages
              </a>
              <a href='/' className='tag color-link'>
                writing
              </a>
            </div>
          </div>
          <h3 className='text-center underlined'>About the author</h3>
          <div className='author'>
            <img
              className='author__img'
              src='https://mksdmcdn-9b59.kxcdn.com/typology/wp-content/uploads/2017/03/madison_barnett-100x100.jpg'
              alt=''
            />
            <div>
              <h3 className='author__name'>Madison Barnett</h3>
              <p className='author__desc'>
                I get my inspiration from the fictional world. I'm a social
                geek. Completely exploit 24/365 catalysts for change whereas
                high standards in action items. Conveniently whiteboard
                multifunctional benefits without enabled leadership.
              </p>
              <div className='btns-row'>
                <Link to='/profile' className='btn'>
                  View profile
                </Link>
                <button className='btn btn--outline'>Follow Author</button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
}

export default SingleArticle;
