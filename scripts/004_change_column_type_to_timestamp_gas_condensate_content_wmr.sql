alter table "GasCondensateContentWmr" 
add column "SamplingDate1" timestamp,
add column "DeliveringDate1" timestamp,
add column "AnalysisDate1" timestamp;

update "GasCondensateContentWmr" 
set "SamplingDate1" = subquery."SamplingDateTimestamp",
	"DeliveringDate1" = subquery."DeliveringDateTimestamp",
	"AnalysisDate1" = subquery."AnalysisDateTimestamp"
from
(select 
"Id",
to_timestamp((cast("SamplingDate" as text) || ' 00:00:01'), 'YYYY-MM-DD HH24:MI:SS') as "SamplingDateTimestamp",
to_timestamp((cast("DeliveringDate" as text) || ' 00:00:01'), 'YYYY-MM-DD HH24:MI:SS') as "DeliveringDateTimestamp",
to_timestamp((cast("AnalysisDate" as text) || ' 00:00:01'), 'YYYY-MM-DD HH24:MI:SS') as "AnalysisDateTimestamp" 
from "GasCondensateContentWmr") as subquery
where "GasCondensateContentWmr"."Id" = subquery."Id";

alter table "GasCondensateContentWmr" 
drop column "SamplingDate",
drop column "DeliveringDate",
drop column "AnalysisDate";

alter table "GasCondensateContentWmr" 
rename column "SamplingDate1" to "SamplingDate";

alter table "GasCondensateContentWmr" 
rename column "DeliveringDate1" to "DeliveringDate";

alter table "GasCondensateContentWmr" 
rename column "AnalysisDate1" to "AnalysisDate";