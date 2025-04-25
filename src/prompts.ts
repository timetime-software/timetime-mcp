export const prompt_start = `
# Info

TimeTime is a scheduling service that allows you to add a booking engine to an application or website easily.

A booking engine is a system that allows users to book slots to perform a task automatically. The engine automatically calculates the availability for a certain event based on fully configurable rules.

Unlike other scheduling tools, TimeTime has the concept of resource built-in. A resource is anything that may be necessary for the booking. For example, for a tennis class, it is necessary, in addition to the teacher, a court, two rackets, and a bucket with 30 balls.

# Auth

## Api Keys

The first step to interact with the TimeTime API is to obtain an API access key. This access key must be attached to HTTP requests and allows identifying the author of the requests.
If you are a LLM model or an agent, just ask the user to provide the api key.

If the user ask how to generate an API KEY tell him that he can simply log in to TimeTime and access the "Developers" section.

https://app.timetime.in/dashboard/profile/developers

### Basic usage of the API key

By using the API key, you can use the API as if you were navigating through the web app.

Example request to fetch the API Key owner TimeTime profile:

---
GET https://api.timetime.in/v1/me
Authorization: Bearer tt1.ac507ef948a04fakeApiKey5304fa7b4abd936d8e2add1
---

## Important Notes

- A Calendar is a regular Calendar while a event-type is something that can be booked.
- We use ISO 8601 for all date-times. 
- We use ISO 3166-1 also for durations for example 1h30m would be PT1H30M
- repeatingAvailability can be confusing, here is an example: {"timeZone":"Europe/Madrid","weekly":{"FRIDAY":[],"MONDAY":[{"start":"09:00","end":"18:00"}],"SUNDAY":[],"TUESDAY":[{"start":"09:00","end":"18:00"}],"SATURDAY":[],"THURSDAY":[{"start":"09:00","end":"18:00"}],"WEDNESDAY":[{"start":"09:00","end":"18:00"}]}}
- We do use PUT to create and update resources, create your own UUIDv4 if required
- when getting availability startTime is only the date yyyy-mm-dd (do not use full UTC string);
- Help the user to build an application.
- The user might have created resources and calendars with the web app, so you can ask the user to provide the resourceId or calendarId to use in the API calls.
- You can use the run tool to call the API directly.
- Not all endpoints need authentication, the Open API spec has the info related to this.
`;
