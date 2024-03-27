import styled from "styled-components";

export const CarsList = styled.div`
  width: 70%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, max-content));
  align-items: center;
  gap: 50px;
`;

export const CarImg = styled.img`
  width: 100%;
  height: 140px;
  border-radius: 16px 16px 0px 0px;
  object-fit: cover;
  transition: all 0.6s ease;
`;

export const ImgWrapper = styled.div`
  overflow: hidden;
  height: 140px;
  border-radius: 16px 16px 0px 0px;
`;

export const CarCard = styled.div`
  cursor: pointer;
  width: 250px;
  height: 300px;
  border-radius: 16px;
  background: #fffdfd;
  box-shadow: 0px 0px 9.2px -2px rgba(0, 0, 0, 0.25);
  transition: all 0.6s ease;
  &:hover {
    box-shadow: 0px 13px 20px 0px rgba(170, 170, 170, 1);
    transform: translate(0px, -5px);
    ${CarImg} {
      transform: scale(1.2);
    }
  }
`;

export const CarName = styled.p`
  font-family: var(--gilroy-medium);
`;

export const CarInfo = styled.div`
  padding: 16px;
  height: 53%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const CarDetails = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const CarType = styled.div`
  display: flex;
  align-items: center;
`;

export const CarDetailsIcon = styled.img`
  height: 20px;
  margin-right: 5px;
`;

export const CarDetailsCarIcon = styled(CarDetailsIcon)`
  height: 35px;
`;

export const CarOwnerDetails = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
`;

export const CarOwner = styled.div`
  display: flex;
  align-items: center;
`;

export const CarOwnerIcon = styled.img`
  object-fit: cover;
  width: 25px;
  height: 25px;
  border-radius: 50%;
`;

export const CarOwnerLocationIcon = styled.img`
  height: 20px;
`;

export const CarOwnerInfo = styled.p`
  margin-left: 10px;
`;
