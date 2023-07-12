import { ContainerDataForm } from "./FormPerson.styles";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepButton from "@mui/material/StepButton";
import Button from "@mui/material/Button";
import React, { useState } from "react";
import { Toaster } from "react-hot-toast";
import {
  PersonData,
  ChargedSpouse,
  ChargedChild,
  ChargesFather,
  CashProyect,
} from "../../components";
import { UserAuth } from "../../context/AuthContext";

const FormPerson = () => {
  const { valueState, valueStateFather, valueStateConyugue } = UserAuth();
  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState({});

  const steps = [
    "Datos Personales",
    "Carga Familiar (Cónyuge)",
    "Carga Familiar (Hijos)",
    "Carga Familiar (Padres)",
    "Gastos Proyectados",
  ];

  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <ContainerDataForm>
      <Box sx={{ width: "100%" }}>
        <Stepper nonLinear activeStep={activeStep}>
          {steps.map((label, index) => (
            <Step key={label} completed={completed[index]}>
              <StepButton color="inherit">{label}</StepButton>
            </Step>
          ))}
        </Stepper>
        {activeStep == 0 && <PersonData />}
        {activeStep == 1 && <ChargedSpouse />}
        {activeStep == 2 && <ChargedChild />}
        {activeStep == 3 && <ChargesFather />}
        {activeStep == 4 && <CashProyect />}

        <div>
          <React.Fragment>
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Atras
              </Button>

              <Box sx={{ flex: "1 1 auto" }} />
              <Button
                onClick={handleNext}
                sx={{ mr: 1 }}
                disabled={
                  activeStep === 4 ||
                  (valueState == false && activeStep === 2) ||
                  (valueStateFather == false && activeStep === 3) ||
                  (valueStateConyugue == false && activeStep === 1)
                }
              >
                Siguiente
              </Button>
            </Box>
          </React.Fragment>
        </div>
      </Box>

      <Toaster
          position="top-right"
          toastOptions={{
            className: "",
            duration: 3500,
            style: {
              background: "#f70707",
              color: "#fff",
            },
          }}
        />
    </ContainerDataForm>
  );
};

export default FormPerson;
