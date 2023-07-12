/** @jsxImportSource @emotion/react */

import Button from "react-bootstrap/esm/Button"
import { HomeContainer, HomeSection } from "../../styles/Home"

import { css } from "@emotion/react"

const Home = () => {
  return (
    <>
      <HomeSection>
        <HomeContainer className="container">
          <div className="row text-white">
            <div className="col-12 col-sm-8">
              <h1 className="fw-bold mb-3">Best Transport Solutions</h1>
              <p className="h5 mb-3">
                We are dedicated to delivering exceptional transportation
                services that cater to all your needs. With our team of
                experienced professionals and a fleet of modern vehicles, we
                ensure safe, reliable, and timely transportation for individuals
                and businesses alike. Whether it's local or long-distance
                travel, logistics management, or specialized transport
                requirements, our commitment to excellence sets us apart. Trust
                us for the best transportation solutions that guarantee
                satisfaction every step of the way.
              </p>
              <Button
                css={css`
                  font-size: 1.5rem;
                  border-radius: 30px;
                `}
                className="text-white py-1 px-4"
                variant="info"
              >
                See More
              </Button>
            </div>
          </div>
        </HomeContainer>
      </HomeSection>
    </>
  )
}
export default Home
