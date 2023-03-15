import { useContext } from "react";
import Header from "../../components/Header";
import { StyledMain, StyledSection } from "./style";
import VarForm from "../../components/Forms/VarForm";
import Input from "../../components/Forms/Input";
import InputColorPick from "../../components/Forms/InputColorPick";
import Button from "../../components/Button";
import { VarContext } from "../../providers/VarContext";
import { useCopyToClipboard } from "usehooks-ts";
import TextField from "@mui/material/TextField";
import { LogoLink, TopLink } from "../../components/Header/style";
import varify from "../../assets/varify.png";
import { UserContext } from "../../providers/UserContext";
import { ToastifyContext } from "../../providers/ToastifyContext";

const LandingPage = () => {
  const { variables, setVarColors, setVarSizes, globalVarGenerator } =
    useContext(VarContext);

  const { user, userID, saveUserVars } = useContext(UserContext);

  const { toastify } = useContext(ToastifyContext);

  const [value, copy] = useCopyToClipboard();

  return (
    <>
      <Header>
        <div className="container">
          <div className="logo">
            <LogoLink to="/">
              <img src={varify} alt="" className="logo" />
              varify
            </LogoLink>
          </div>

          {user ? (
            <nav>
              <TopLink href="/dashboard">Dashboard</TopLink>
            </nav>
          ) : (
            <nav>
              <TopLink href="/register">Cadastre-se</TopLink>
              <TopLink href="/login">Login</TopLink>
            </nav>
          )}
        </div>
      </Header>

      <StyledSection>
        <h2>
          <span>Simplifique</span> seu trabalho,
        </h2>
        <h2>
          aumente sua produtividade com o <span>Varify.</span>
        </h2>

        <p>
          a plataforma que vai otimizar a maneira de criar variáveis de
          estilização.
        </p>
      </StyledSection>

      <StyledMain>
        <div className="upperForms">
          <VarForm name="Cores">
            <InputColorPick
              className="colorPrimary"
              label="Cor primária"
              color={variables.colorPrimary}
              setColorFunction={setVarColors}
            ></InputColorPick>
            <InputColorPick
              className="colorSecondary"
              label="Cor secundária"
              color={variables.colorSecondary}
              setColorFunction={setVarColors}
            ></InputColorPick>
            <InputColorPick
              className="colorTertiary"
              label="Cor terciária"
              color={variables.colorTertiary}
              setColorFunction={setVarColors}
            ></InputColorPick>
          </VarForm>
          <VarForm
            checkbox
            onChangeFunction={(event) => {
              const titleID = event.target.id;
              const titleValue = event.target.value;
              setVarSizes(titleID, titleValue);
            }}
            name="Títulos"
          >
            <Input label="Título 1" id="titleSize-1" type="number"></Input>
            <Input label="Título 2" id="titleSize-2" type="number"></Input>
            <Input label="Título 3" id="titleSize-3" type="number"></Input>
          </VarForm>

          <VarForm
            checkbox
            onChangeFunction={(event) => {
              const textId = event.target.id;
              const textValue = event.target.value;
              setVarSizes(textId, textValue);
            }}
            name="Textos"
          >
            <Input label="Texto 1" id="textSize-1" type="number"></Input>
            <Input label="Texto 2" id="textSize-2" type="number"></Input>
            <Input label="Texto 3" id="textSize-3" type="number"></Input>
          </VarForm>

          <VarForm
            checkbox
            onChangeFunction={(event) => {
              const radiusID = event.target.id;
              const radiusValue = event.target.value;
              setVarSizes(radiusID, radiusValue);
            }}
            name="Radius"
          >
            <Input label="Radius 1" id="radiusSize-1" type="number"></Input>
            <Input label="Radius 2" id="radiusSize-2" type="number"></Input>
            <Input label="Radius 3" id="radiusSize-3" type="number"></Input>
          </VarForm>
        </div>

        <fieldset className="titleBoxField">
          <legend>Váriaveis globais</legend>
          <TextField
            multiline
            className="boxTextField"
            value={globalVarGenerator(variables)}
            InputProps={{ readOnly: true }}
          ></TextField>

          <div className="containerButtons">
            <Button
              type="button"
              onClickFunction={() => {
                saveUserVars(variables);
              }}
              disabled={userID ? false : true}
            >
              Favoritar variáveis
            </Button>
            <Button
              type="button"
              onClickFunction={() => {
                copy(globalVarGenerator(variables));
                toastify("success", "Variáveis copiadas com sucesso");
              }}
            >
              Copiar variáveis
            </Button>
          </div>
        </fieldset>
      </StyledMain>
    </>
  );
};

export default LandingPage;
