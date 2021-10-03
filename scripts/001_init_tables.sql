CREATE TABLE "Places" (
  "Id" serial PRIMARY KEY,
  "Name" varchar
);

CREATE TABLE "Users" (
  "Id" serial PRIMARY KEY,
  "FirstName" varchar,
  "LastName" varchar,
  "Patronymic" varchar
);

CREATE TABLE "Points" (
  "Id" serial PRIMARY KEY,
  "Name" varchar,
  "PlaceId" int
);

CREATE TABLE "ChemicalAnalysis" (
  "Id" serial PRIMARY KEY,
  "RegCode" varchar,
  "DeliveringDate" date,
  "AnalysisDate" date,
  "SamplingDate" date,
  "WmrContent" int,
  "CondensateContent" int,
  "MassFractionOfMethanol" float,
  "MassFractionOfMethanolError" float,
  "MassFractionOfMethanolNotAvailable" boolean,
  "MassFractionOfWater" float,
  "MassFractionOfWaterError" float,
  "MassFractionOfWaterNotAvailable" boolean,
  "MassConcentrationOfCorrosionInhibitor" int,
  "MassConcentrationOfCorrosionInhibitorNotAvailable" boolean,
  "PointId" int,
  "UserId" int
);

ALTER TABLE "Points" ADD FOREIGN KEY ("PlaceId") REFERENCES "Places" ("Id");

ALTER TABLE "ChemicalAnalysis" ADD FOREIGN KEY ("PointId") REFERENCES "Points" ("Id");

ALTER TABLE "ChemicalAnalysis" ADD FOREIGN KEY ("UserId") REFERENCES "Users" ("Id");
