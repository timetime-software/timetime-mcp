export const spec = {
    openapi: "3.1.0",
    info: {
        contact: {
            email: "info@timetime.in",
            url: "https://timetime.in",
        },
        description: "TimeTime API",
        title: "TimeTime",
        version: "v1",
    },
    servers: [
        {
            url: "https://api.timetime.in",
            description: "The TimeTime API server.",
        },
    ],
    security: [
        {
            HttpAuth: [],
        },
    ],
    paths: {
        "/v1/accepted-org-invitations": {
            post: {
                operationId: "postAcceptedOrganizationInvite",
                requestBody: {
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/AcceptedOrganizationInvite",
                            },
                        },
                    },
                    required: true,
                },
                responses: {
                    "204": {
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/Unit",
                                },
                            },
                        },
                        description: "No Content",
                    },
                },
                tags: ["organizations"],
            },
        },
        "/v1/api-keys": {
            get: {
                operationId: "listUserApiKeys",
                responses: {
                    "200": {
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/ApiKeysListModel",
                                },
                            },
                        },
                        description: "OK",
                    },
                },
                tags: ["api-key"],
            },
            post: {
                operationId: "createApiKey",
                requestBody: {
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/CreateApiKeyBody",
                            },
                        },
                    },
                    required: true,
                },
                responses: {
                    "200": {
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/CreateApiKeyResponseModel",
                                },
                            },
                        },
                        description: "OK",
                    },
                },
                tags: ["api-key"],
            },
        },
        "/v1/bookings": {
            get: {
                operationId: "listBookings",
                parameters: [
                    {
                        in: "query",
                        name: "from",
                        required: false,
                        schema: {
                            type: "string",
                            format: "date-time",
                        },
                    },
                    {
                        in: "query",
                        name: "days",
                        required: false,
                        schema: {
                            type: "integer",
                            format: "int64",
                            default: 14,
                            maximum: 50,
                            minimum: 1,
                        },
                    },
                    {
                        in: "query",
                        name: "eventTypeId",
                        required: false,
                        schema: {
                            type: "string",
                            format: "uuid",
                        },
                    },
                ],
                responses: {
                    "200": {
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/BookingsList",
                                },
                            },
                        },
                        description: "OK",
                    },
                },
                tags: ["booking"],
            },
            post: {
                operationId: "createBooking",
                requestBody: {
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/CreateBookingRequest",
                            },
                        },
                    },
                    required: true,
                },
                responses: {
                    "201": {
                        content: {
                            "application/json": {
                                schema: {},
                            },
                        },
                        description: "Created",
                    },
                },
                summary: "Create booking",
                tags: ["booking"],
            },
        },
        "/v1/bookings/{id}": {
            get: {
                operationId: "getBooking",
                parameters: [
                    {
                        in: "path",
                        name: "id",
                        required: true,
                        schema: {
                            type: "string",
                            format: "uuid",
                        },
                    },
                ],
                responses: {
                    "200": {
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/PublicBooking",
                                },
                            },
                        },
                        description: "OK",
                    },
                },
                security: [],
                tags: ["booking"],
            },
            patch: {
                operationId: "updateBooking",
                parameters: [
                    {
                        in: "path",
                        name: "id",
                        required: true,
                        schema: {
                            type: "string",
                            format: "uuid",
                        },
                    },
                ],
                requestBody: {
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/PatchBookingBody",
                            },
                        },
                    },
                    required: true,
                },
                responses: {
                    "200": {
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/Unit",
                                },
                            },
                        },
                        description: "OK",
                    },
                },
                tags: ["booking"],
            },
        },
        "/v1/bookings/{id}/cancellation": {
            post: {
                operationId: "cancel",
                parameters: [
                    {
                        in: "path",
                        name: "id",
                        required: true,
                        schema: {
                            type: "string",
                            format: "uuid",
                        },
                    },
                ],
                requestBody: {
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/CancelBookingRequest",
                            },
                        },
                    },
                },
                responses: {
                    "201": {
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/Unit",
                                },
                            },
                        },
                        description: "The booking has been cancelled.",
                    },
                    "409": {
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/Unit",
                                },
                            },
                        },
                        description: "Either someone else already cancelled the booking or a previous request for cancelling the booking by this user was already processed with a different reason.",
                    },
                },
                security: [],
                summary: "Cancel booking",
                tags: ["booking"],
            },
        },
        "/v1/bookings/{id}/confirmed-holds": {
            post: {
                operationId: "confirm",
                parameters: [
                    {
                        in: "path",
                        name: "id",
                        required: true,
                        schema: {
                            type: "string",
                            format: "uuid",
                        },
                    },
                ],
                responses: {
                    "200": {
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/PublicBooking",
                                },
                            },
                        },
                        description: "The booking has been confirmed.",
                    },
                    "403": {
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/ProblemDetail",
                                },
                            },
                        },
                        description: "The booking can't be managed by the current user.",
                    },
                    "409": {
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/ProblemDetail",
                                },
                            },
                        },
                        description: "The booking is canceled, can't confirm this hold.",
                    },
                },
                summary: "Confirms a held booking.",
                tags: ["booking"],
            },
        },
        "/v1/calendar-event-invitations/{id}": {
            get: {
                operationId: "getCalendarEventInvitation",
                parameters: [
                    {
                        in: "path",
                        name: "id",
                        required: true,
                        schema: {
                            type: "string",
                            format: "uuid",
                        },
                    },
                ],
                responses: {
                    "200": {
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/CalendarEventInvitation",
                                },
                            },
                        },
                        description: "The requested calendar event invitation.",
                    },
                    "404": {
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/ProblemDetail",
                                },
                            },
                        },
                        description: "The calendar event invitation does not exist.",
                    },
                },
                security: [],
                summary: "Get a calendar event invitation.",
                tags: ["calendars"],
            },
        },
        "/v1/calendar-event-invitations/{invitationId}/replies": {
            post: {
                operationId: "postInvitationReply",
                parameters: [
                    {
                        in: "path",
                        name: "invitationId",
                        required: true,
                        schema: {
                            type: "string",
                            format: "uuid",
                        },
                    },
                ],
                requestBody: {
                    content: {
                        "application/json": {
                            schema: {
                                oneOf: [
                                    {
                                        $ref: "#/components/schemas/EventInvitationReplyAccept",
                                    },
                                    {
                                        $ref: "#/components/schemas/EventInvitationReplyDecline",
                                    },
                                ],
                            },
                        },
                    },
                    required: true,
                },
                responses: {
                    "204": {
                        content: {
                            "application/json": {},
                        },
                        description: "The invitation reply has been stored successfully.",
                    },
                    "400": {
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/ProblemDetail",
                                },
                            },
                        },
                        description: "Some field is not valid.",
                    },
                    "404": {
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/ProblemDetail",
                                },
                            },
                        },
                        description: "The invitation was not found.",
                    },
                },
                security: [],
                summary: "Add the invitation reply.",
                tags: ["calendars"],
            },
        },
        "/v1/calendar-events": {
            get: {
                operationId: "listCalendarEvents",
                parameters: [
                    {
                        in: "query",
                        name: "calendarIds",
                        required: false,
                        schema: {
                            type: "array",
                            items: {
                                type: "string",
                                format: "uuid",
                            },
                            uniqueItems: true,
                        },
                    },
                    {
                        in: "query",
                        name: "timeMin",
                        required: true,
                        schema: {
                            type: "string",
                            format: "date-time",
                        },
                    },
                    {
                        in: "query",
                        name: "timeMax",
                        required: true,
                        schema: {
                            type: "string",
                            format: "date-time",
                        },
                    },
                    {
                        in: "query",
                        name: "includeEventsWithoutInterval",
                        required: false,
                        schema: {
                            type: "boolean",
                        },
                    },
                ],
                responses: {
                    "200": {
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/CalendarEventsList",
                                },
                            },
                        },
                        description: "The list of the calendar events.",
                    },
                    "400": {
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/ProblemDetail",
                                },
                            },
                        },
                        description: "Some field is not valid.",
                    },
                    "403": {
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/ProblemDetail",
                                },
                            },
                        },
                        description: "The authenticated user can't access to some of the requested calendars.",
                    },
                },
                summary: "List calendar events.",
                tags: ["calendars"],
            },
        },
        "/v1/calendar-events/{eventId}": {
            delete: {
                operationId: "deleteCalendarEvent",
                parameters: [
                    {
                        in: "path",
                        name: "eventId",
                        required: true,
                        schema: {
                            type: "string",
                            format: "uuid",
                        },
                    },
                ],
                responses: {
                    "204": {
                        content: {
                            "application/json": {},
                        },
                        description: "The event has been deleted successfully.",
                    },
                    "403": {
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/ProblemDetail",
                                },
                            },
                        },
                        description: "The authenticated user can't delete this event.",
                    },
                },
                summary: "Deletes a calendar event.",
                tags: ["calendars"],
            },
            get: {
                operationId: "getCalendarEvent",
                parameters: [
                    {
                        in: "path",
                        name: "eventId",
                        required: true,
                        schema: {
                            type: "string",
                            format: "uuid",
                        },
                    },
                ],
                responses: {
                    "200": {
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/CalendarEvent",
                                },
                            },
                        },
                        description: "The requested calendar event.",
                    },
                    "403": {
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/ProblemDetail",
                                },
                            },
                        },
                        description: "The authenticated user can't access this calendar event.",
                    },
                    "404": {
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/ProblemDetail",
                                },
                            },
                        },
                        description: "The calendar event does not exist.",
                    },
                },
                summary: "Get a calendar event.",
                tags: ["calendars"],
            },
            put: {
                operationId: "putCalendarEvent",
                parameters: [
                    {
                        in: "path",
                        name: "eventId",
                        required: true,
                        schema: {
                            type: "string",
                            format: "uuid",
                        },
                    },
                ],
                requestBody: {
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/PutCalendarEventRequest",
                            },
                        },
                    },
                    required: true,
                },
                responses: {
                    "200": {
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/CalendarEvent",
                                },
                            },
                        },
                        description: "The event has been created or updated successfully.",
                    },
                    "400": {
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/ProblemDetail",
                                },
                            },
                        },
                        description: "Some field is not valid.",
                    },
                    "403": {
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/ProblemDetail",
                                },
                            },
                        },
                        description: "The authenticated user can't modify this user.",
                    },
                    "404": {
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/ProblemDetail",
                                },
                            },
                        },
                        description: "The calendar does not exist.",
                    },
                },
                summary: "Creates or updates a calendar event.",
                tags: ["calendars"],
            },
        },
        "/v1/calendars": {
            get: {
                operationId: "listCalendars",
                responses: {
                    "200": {
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/CalendarsList",
                                },
                            },
                        },
                        description: "The list of accessible calendars for the current user.",
                    },
                },
                summary: "List calendars.",
                tags: ["calendars"],
            },
        },
        "/v1/calendars/{calendarId}": {
            delete: {
                operationId: "deleteCalendar",
                parameters: [
                    {
                        in: "path",
                        name: "calendarId",
                        required: true,
                        schema: {
                            type: "string",
                            format: "uuid",
                        },
                    },
                ],
                responses: {
                    "204": {
                        content: {
                            "application/json": {},
                        },
                        description: "The calendar has been deleted successfully.",
                    },
                    "403": {
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/ProblemDetail",
                                },
                            },
                        },
                        description: "The authenticated user can't modify this calendar.",
                    },
                },
                summary: "Deletes a calendar.",
                tags: ["calendars"],
            },
            get: {
                operationId: "getCalendar",
                parameters: [
                    {
                        in: "path",
                        name: "calendarId",
                        required: true,
                        schema: {
                            type: "string",
                            format: "uuid",
                        },
                    },
                ],
                responses: {
                    "200": {
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/Calendar",
                                },
                            },
                        },
                        description: "The requested calendar.",
                    },
                    "403": {
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/ProblemDetail",
                                },
                            },
                        },
                        description: "The authenticated user can't access this calendar.",
                    },
                    "404": {
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/ProblemDetail",
                                },
                            },
                        },
                        description: "The calendar does not exist.",
                    },
                },
                summary: "Get a calendar.",
                tags: ["calendars"],
            },
            put: {
                operationId: "putCalendar",
                parameters: [
                    {
                        in: "path",
                        name: "calendarId",
                        required: true,
                        schema: {
                            type: "string",
                            format: "uuid",
                        },
                    },
                ],
                requestBody: {
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/PutCalendar",
                            },
                        },
                    },
                    required: true,
                },
                responses: {
                    "204": {
                        content: {
                            "application/json": {},
                        },
                        description: "The calendar has been created or updated successfully.",
                    },
                    "400": {
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/ProblemDetail",
                                },
                            },
                        },
                        description: "Some field is not valid.",
                    },
                    "403": {
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/ProblemDetail",
                                },
                            },
                        },
                        description: "The authenticated user can't modify this calendar.",
                    },
                },
                summary: "Creates or updates a calendar.",
                tags: ["calendars"],
            },
        },
        "/v1/consent": {
            post: {
                operationId: "postThirdPartyConsent",
                requestBody: {
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/ThirdPartyConsentBody",
                            },
                        },
                    },
                    required: true,
                },
                responses: {
                    "204": {
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/Unit",
                                },
                            },
                        },
                        description: "No Content",
                    },
                },
                tags: ["user"],
            },
        },
        "/v1/event-types": {
            get: {
                operationId: "listEventTypesByOwnerId",
                parameters: [
                    {
                        in: "query",
                        name: "ownerId",
                        required: false,
                        schema: {
                            type: "string",
                            format: "uuid",
                        },
                    },
                ],
                responses: {
                    "200": {
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/EventTypesListBody",
                                },
                            },
                        },
                        description: "OK",
                    },
                },
                tags: ["event-type"],
            },
        },
        "/v1/event-types/{id}": {
            delete: {
                operationId: "delete",
                parameters: [
                    {
                        in: "path",
                        name: "id",
                        required: true,
                        schema: {
                            type: "string",
                            format: "uuid",
                        },
                    },
                ],
                responses: {
                    "204": {
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/Unit",
                                },
                            },
                        },
                        description: "No Content",
                    },
                },
                tags: ["event-type"],
            },
            get: {
                operationId: "getEventType",
                parameters: [
                    {
                        in: "path",
                        name: "id",
                        required: true,
                        schema: {
                            type: "string",
                            format: "uuid",
                        },
                    },
                ],
                responses: {
                    "200": {
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/EventType",
                                },
                            },
                        },
                        description: "The requested event type.",
                    },
                    "403": {
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/ProblemDetail",
                                },
                            },
                        },
                        description: "The event type is not accessible for the principal.",
                    },
                    "404": {
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/ProblemDetail",
                                },
                            },
                        },
                        description: "The event type does not exist.",
                    },
                },
                summary: "Get an event type.",
                tags: ["event-type"],
            },
            put: {
                operationId: "putEventType",
                parameters: [
                    {
                        in: "path",
                        name: "id",
                        required: true,
                        schema: {
                            type: "string",
                            format: "uuid",
                        },
                    },
                ],
                requestBody: {
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/PutEventTypeModel",
                            },
                        },
                    },
                    required: true,
                },
                responses: {
                    "204": {
                        content: {
                            "application/json": {
                                schema: {},
                            },
                        },
                        description: "No Content",
                    },
                },
                tags: ["event-type"],
            },
        },
        "/v1/event-types/{id}/availability": {
            get: {
                operationId: "getEventTypeAvailability",
                parameters: [
                    {
                        description: "\nThe event type identifier. This endpoint admits 2 different ways for identifying the event type:\n\n1. The event type `UUID` (the same used when creating the event type).\n2. The combination of the event owner slug + the event type slug, concatenated by ':', example:\n`GET /v1/event-types/event-owner-slug:event-type-slug/availability`\n            ",
                        in: "path",
                        name: "id",
                        required: true,
                        schema: {
                            type: "string",
                        },
                    },
                    {
                        description: "\nThe starting date to get the availability in ISO-8601 format, example: `2021-01-01`.\n\nIf the parameter is not provided, the current day in the UTC time zone is used.\n            ",
                        in: "query",
                        name: "from",
                        required: false,
                        schema: {
                            type: "string",
                            format: "date",
                        },
                    },
                    {
                        description: "\nStarting from the 'from' value, this sets the limit day to verify the event availability.\n\nMinimum allowed is `1`, and maximum is `14`.\n            ",
                        in: "query",
                        name: "days",
                        required: false,
                        schema: {
                            type: "integer",
                            format: "int64",
                            default: 7,
                            maximum: 43,
                            minimum: 1,
                        },
                    },
                    {
                        description: "\nFor bookings with multiple units (e.g. a party booking a table in a restaurant) this is the parameter\nthat specifies how many units need to be available to consider each time slot free and therefore bookable.\n\nOnly positive values are allowed.\n            ",
                        in: "query",
                        name: "units",
                        required: false,
                        schema: {
                            type: "integer",
                            format: "int32",
                            default: 1,
                            minimum: 1,
                        },
                    },
                    {
                        description: '\nThe TimeZone id (IANA) to be used in combination with the "from" parameter to calculate the availability.\n            ',
                        in: "query",
                        name: "timeZone",
                        required: false,
                        schema: {
                            type: "string",
                            default: "GMT",
                        },
                    },
                    {
                        description: "\nEvent types can have i18n configuration for some fields, such `name`, `description`,\nquestions `label` field...'\nThe `locale` query param can be used to ask for the event type translated into that language if\navailable.\nIf the event type has not been configured with translations for the queried language, the default values\nwill be used.\n            ",
                        in: "query",
                        name: "locale",
                    },
                ],
                responses: {
                    "200": {
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/EventTypeAvailabilityModel",
                                },
                            },
                        },
                        description: "Successful response with the availability.",
                    },
                    "404": {
                        content: {
                            "application/json": {
                                schema: {},
                            },
                        },
                        description: "The event type doesn't exist.",
                    },
                },
                security: [],
                tags: ["event-type"],
            },
        },
        "/v1/external-booking-validation-example": {
            post: {
                operationId: "externalValidationExample",
                requestBody: {
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/ExternalBookingValidationModel",
                            },
                        },
                    },
                    required: true,
                },
                responses: {
                    "204": {
                        content: {
                            "application/json": {
                                schema: {},
                            },
                        },
                        description: "Booking has been validated successfully, so TimeTime can proceed.",
                    },
                    "400": {
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/ProblemDetail",
                                },
                            },
                        },
                        description: "The booking is not valid for the configured external system.",
                    },
                },
                security: [],
                tags: ["booking"],
            },
        },
        "/v1/external-bookings/{id}": {
            put: {
                operationId: "createExternalBooking",
                parameters: [
                    {
                        in: "path",
                        name: "id",
                        required: true,
                        schema: {
                            type: "string",
                            format: "uuid",
                        },
                    },
                ],
                requestBody: {
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/ExternalBooking",
                            },
                        },
                    },
                    required: true,
                },
                responses: {
                    "204": {
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/Unit",
                                },
                            },
                        },
                        description: "No Content",
                    },
                },
                tags: ["booking"],
            },
        },
        "/v1/external-webhook-receiver-example": {
            post: {
                operationId: "receiveWebhook",
                requestBody: {
                    content: {
                        "application/json": {
                            schema: {
                                oneOf: [
                                    {
                                        $ref: "#/components/schemas/BookingChanged",
                                    },
                                    {
                                        $ref: "#/components/schemas/CalendarEventChanged",
                                    },
                                    {
                                        $ref: "#/components/schemas/UpcomingBooking",
                                    },
                                ],
                            },
                        },
                    },
                    required: true,
                },
                responses: {
                    "202": {
                        content: {
                            "application/json": {
                                schema: {},
                            },
                        },
                        description: "The webhook processing job was scheduled successfully.",
                    },
                    "204": {
                        content: {
                            "application/json": {
                                schema: {},
                            },
                        },
                        description: "The webhook was processed successfully.",
                    },
                },
                tags: ["webhook"],
            },
        },
        "/v1/google-consent": {
            post: {
                operationId: "postGoogleConsent",
                parameters: [
                    {
                        in: "header",
                        name: "Origin",
                        required: false,
                        schema: {
                            type: "string",
                        },
                    },
                ],
                requestBody: {
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/GoogleConsentBody",
                            },
                        },
                    },
                    required: true,
                },
                responses: {
                    "204": {
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/Unit",
                                },
                            },
                        },
                        description: "No Content",
                    },
                },
                tags: ["user"],
            },
        },
        "/v1/login": {
            post: {
                operationId: "login",
                parameters: [
                    {
                        in: "header",
                        name: "Authorization",
                        required: true,
                        schema: {
                            type: "string",
                        },
                    },
                    {
                        in: "header",
                        name: "Referer",
                        required: false,
                        schema: {
                            type: "string",
                        },
                    },
                    {
                        in: "header",
                        name: "X-TT-Impersonated-User-Id",
                        required: false,
                        schema: {
                            type: "string",
                        },
                    },
                ],
                responses: {
                    "200": {
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/User",
                                },
                            },
                        },
                        description: "OK",
                    },
                },
                security: [],
                tags: ["user"],
            },
        },
        "/v1/login-tokens": {
            post: {
                description: "**ADMIN** role for the tenant is required.\n\nTimeTime is a multi-tenant service. A given user can have multiple accounts in TimeTime, but always for different tenants.\n\nWhen an admin request a login token, this operation will take the tenant of that admin and the the input, to perform the lookup.\nIf the user does not exist, it'll automatically create it.",
                operationId: "createLoginToken",
                requestBody: {
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/CreateLoginTokenRequest",
                            },
                        },
                    },
                    required: true,
                },
                responses: {
                    "201": {
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/LoginToken",
                                },
                            },
                        },
                        description: "The login token has been created successfully.",
                    },
                    "400": {
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/ProblemDetail",
                                },
                            },
                        },
                        description: "Some field is not valid.",
                    },
                    "403": {
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/ProblemDetail",
                                },
                            },
                        },
                        description: "Current user has no permissions to create a token for the requested user.",
                    },
                },
                summary: "Creates a temporary login token.",
                tags: ["user"],
            },
        },
        "/v1/me": {
            get: {
                operationId: "getCurrentUser",
                responses: {
                    "200": {
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/User",
                                },
                            },
                        },
                        description: "The logged user profile response.",
                    },
                    "403": {
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/User",
                                },
                            },
                        },
                        description: "The authenticated user can't access to the requested user.",
                    },
                    "404": {
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/User",
                                },
                            },
                        },
                        description: "The user does not exist.",
                    },
                },
                tags: ["user"],
            },
        },
        "/v1/organizations": {
            get: {
                operationId: "listOrganizations",
                responses: {
                    "200": {
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/OrganizationsList",
                                },
                            },
                        },
                        description: "OK",
                    },
                },
                tags: ["organizations"],
            },
        },
        "/v1/organizations/{id}": {
            delete: {
                operationId: "deleteOrganization",
                parameters: [
                    {
                        in: "path",
                        name: "id",
                        required: true,
                        schema: {
                            type: "string",
                            format: "uuid",
                        },
                    },
                ],
                responses: {
                    "204": {
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/Unit",
                                },
                            },
                        },
                        description: "No Content",
                    },
                },
                tags: ["organizations"],
            },
            put: {
                operationId: "putOrganization",
                parameters: [
                    {
                        in: "path",
                        name: "id",
                        required: true,
                        schema: {
                            type: "string",
                            format: "uuid",
                        },
                    },
                ],
                requestBody: {
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/PutOrganization",
                            },
                        },
                    },
                    required: true,
                },
                responses: {
                    "204": {
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/Unit",
                                },
                            },
                        },
                        description: "No Content",
                    },
                },
                tags: ["organizations"],
            },
        },
        "/v1/organizations/{orgId}/invitations": {
            post: {
                operationId: "postOrganizationMember",
                parameters: [
                    {
                        in: "path",
                        name: "orgId",
                        required: true,
                        schema: {
                            type: "string",
                            format: "uuid",
                        },
                    },
                ],
                requestBody: {
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/InviteOrganizationMember",
                            },
                        },
                    },
                    required: true,
                },
                responses: {
                    "204": {
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/Unit",
                                },
                            },
                        },
                        description: "No Content",
                    },
                },
                tags: ["organizations"],
            },
        },
        "/v1/organizations/{orgId}/members": {
            get: {
                operationId: "listOrganizationMembers",
                parameters: [
                    {
                        in: "path",
                        name: "orgId",
                        required: true,
                        schema: {
                            type: "string",
                            format: "uuid",
                        },
                    },
                ],
                responses: {
                    "200": {
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/OrganizationMembersList",
                                },
                            },
                        },
                        description: "OK",
                    },
                },
                tags: ["organizations"],
            },
        },
        "/v1/organizations/{orgId}/members/{userId}": {
            delete: {
                operationId: "deleteOrganizationMember",
                parameters: [
                    {
                        in: "path",
                        name: "orgId",
                        required: true,
                        schema: {
                            type: "string",
                            format: "uuid",
                        },
                    },
                    {
                        in: "path",
                        name: "userId",
                        required: true,
                        schema: {
                            type: "string",
                            format: "uuid",
                        },
                    },
                ],
                responses: {
                    "204": {
                        content: {
                            "application/json": {
                                schema: {},
                            },
                        },
                        description: "No Content",
                    },
                },
                tags: ["organizations"],
            },
            patch: {
                operationId: "patchOrganizationMembership",
                parameters: [
                    {
                        in: "path",
                        name: "orgId",
                        required: true,
                        schema: {
                            type: "string",
                            format: "uuid",
                        },
                    },
                    {
                        in: "path",
                        name: "userId",
                        required: true,
                        schema: {
                            type: "string",
                            format: "uuid",
                        },
                    },
                ],
                requestBody: {
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/PatchOrganizationMembership",
                            },
                        },
                    },
                    required: true,
                },
                responses: {
                    "204": {
                        content: {
                            "application/json": {
                                schema: {},
                            },
                        },
                        description: "No Content",
                    },
                },
                tags: ["organizations"],
            },
        },
        "/v1/pricing-policies": {
            get: {
                operationId: "listPricingPolicies",
                responses: {
                    "200": {
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/PricingPolicesList",
                                },
                            },
                        },
                        description: "The user's accessible pricing policies.",
                    },
                },
                summary: "List pricing policies.",
                tags: ["pricing-policies"],
            },
        },
        "/v1/pricing-policies/{id}": {
            delete: {
                operationId: "deletePricingPolicy",
                parameters: [
                    {
                        in: "path",
                        name: "id",
                        required: true,
                        schema: {
                            type: "string",
                            format: "uuid",
                        },
                    },
                ],
                responses: {
                    "204": {
                        content: {
                            "application/json": {},
                        },
                        description: "Pricing Policy deleted successfully",
                    },
                    "403": {
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/ProblemDetail",
                                },
                            },
                        },
                        description: "The authenticated user can't modify this pricing policy",
                    },
                },
                summary: "Delete a pricing policy",
                tags: ["pricing-policies"],
            },
            get: {
                operationId: "getPricingPolicy",
                parameters: [
                    {
                        in: "path",
                        name: "id",
                        required: true,
                        schema: {
                            type: "string",
                            format: "uuid",
                        },
                    },
                ],
                responses: {
                    "200": {
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/PricingPolicy",
                                },
                            },
                        },
                        description: "The requested pricing policy.",
                    },
                    "403": {
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/ProblemDetail",
                                },
                            },
                        },
                        description: "The authenticated user can't access this pricing policy.",
                    },
                    "404": {
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/ProblemDetail",
                                },
                            },
                        },
                        description: "The pricing policy does not exist.",
                    },
                },
                summary: "Get a pricing policy.",
                tags: ["pricing-policies"],
            },
            put: {
                operationId: "putPricePolicy",
                parameters: [
                    {
                        in: "path",
                        name: "id",
                        required: true,
                        schema: {
                            type: "string",
                            format: "uuid",
                        },
                    },
                ],
                requestBody: {
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/PutPricingPolicyRequest",
                            },
                        },
                    },
                    required: true,
                },
                responses: {
                    "204": {
                        content: {
                            "application/json": {},
                        },
                        description: "The pricing policy has been created or updated successfully.",
                    },
                    "400": {
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/ProblemDetail",
                                },
                            },
                        },
                        description: "Some field is not valid.",
                    },
                    "403": {
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/ProblemDetail",
                                },
                            },
                        },
                        description: "The authenticated user can't create or update this pricing policy.",
                    },
                },
                summary: "Creates or updates a pricing policy.",
                tags: ["pricing-policies"],
            },
        },
        "/v1/public-profiles": {
            get: {
                operationId: "listPublicProfiles",
                responses: {
                    "200": {
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/PublicProfilesList",
                                },
                            },
                        },
                        description: "OK",
                    },
                },
                tags: ["public-profile"],
            },
        },
        "/v1/public-profiles/{id}": {
            delete: {
                operationId: "deletePublicProfile",
                parameters: [
                    {
                        in: "path",
                        name: "id",
                        required: true,
                        schema: {
                            type: "string",
                            format: "uuid",
                        },
                    },
                ],
                responses: {
                    "204": {
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/Unit",
                                },
                            },
                        },
                        description: "No Content",
                    },
                },
                tags: ["public-profile"],
            },
            get: {
                operationId: "getPublicProfile",
                parameters: [
                    {
                        in: "path",
                        name: "id",
                        required: true,
                        schema: {
                            type: "string",
                            format: "uuid",
                        },
                    },
                ],
                responses: {
                    "200": {
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/PublicProfile",
                                },
                            },
                        },
                        description: "OK",
                    },
                },
                tags: ["public-profile"],
            },
            put: {
                operationId: "putPublicProfile",
                parameters: [
                    {
                        in: "path",
                        name: "id",
                        required: true,
                        schema: {
                            type: "string",
                            format: "uuid",
                        },
                    },
                ],
                requestBody: {
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/PublicProfileWriteModel",
                            },
                        },
                    },
                    required: true,
                },
                responses: {
                    "204": {
                        content: {
                            "application/json": {
                                schema: {},
                            },
                        },
                        description: "Public profile has been created or updated successfully.",
                    },
                    "400": {
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/ProblemDetail",
                                },
                            },
                        },
                        description: "There is some problem with the received public profile.",
                    },
                },
                tags: ["public-profile"],
            },
        },
        "/v1/public/event-types/{id}": {
            get: {
                operationId: "getPublicEventType",
                parameters: [
                    {
                        description: "The event type identifier. This endpoint admits 2 different ways for identifying the event type:\n\n1. The event type `UUID` (the same used when creating the event type).\n2. The combination of the event owner slug + the event type slug, concatenated by ':', example:\n`GET /v1/event-types/event-owner-slug:event-type-slug/availability`\n",
                        in: "path",
                        name: "id",
                        required: true,
                        schema: {
                            type: "string",
                        },
                    },
                    {
                        description: "Event types can have i18n configuration for some fields, such `name`, `description`,\nquestions `label` field...'\nThe `locale` query param can be used to ask for the event type translated into that language if\navailable.\nIf the event type has not been configured with translations for the queried language, the default values\nwill be used.\n",
                        in: "query",
                        name: "locale",
                    },
                ],
                responses: {
                    "200": {
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/GetPublicEventTypeModel",
                                },
                            },
                        },
                        description: "The requested event type.",
                    },
                    "404": {
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/ProblemDetail",
                                },
                            },
                        },
                        description: "The event type does not exist.",
                    },
                },
                summary: "Get an event type without a user session.",
                tags: ["event-type"],
            },
        },
        "/v1/public/tenant": {
            get: {
                operationId: "getPublicTenant",
                parameters: [
                    {
                        in: "header",
                        name: "Referer",
                        required: false,
                        schema: {
                            type: "string",
                        },
                    },
                    {
                        description: "Optional tenant id to force using that one, instead of checking the referer or the user's tenant.",
                        in: "query",
                        name: "id",
                        required: false,
                        schema: {
                            type: "string",
                        },
                    },
                ],
                responses: {
                    "200": {
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/PublicTenant",
                                },
                            },
                        },
                        description: "The requested tenant.",
                    },
                },
                security: [],
                summary: "Gets the public tenant config.",
                tags: ["tenants"],
            },
        },
        "/v1/resource-groups": {
            get: {
                operationId: "listResourceGroups",
                responses: {
                    "200": {
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/ResourceGroupsListModel",
                                },
                            },
                        },
                        description: "OK",
                    },
                },
                tags: ["resources"],
            },
        },
        "/v1/resource-groups/{id}": {
            delete: {
                operationId: "deleteResourceGroup",
                parameters: [
                    {
                        in: "path",
                        name: "id",
                        required: true,
                        schema: {
                            type: "string",
                            format: "uuid",
                        },
                    },
                ],
                responses: {
                    "204": {
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/Unit",
                                },
                            },
                        },
                        description: "No Content",
                    },
                },
                tags: ["resources"],
            },
            get: {
                operationId: "getResourceGroup",
                parameters: [
                    {
                        in: "path",
                        name: "id",
                        required: true,
                        schema: {
                            type: "string",
                            format: "uuid",
                        },
                    },
                ],
                responses: {
                    "200": {
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/ResourceGroupModel",
                                },
                            },
                        },
                        description: "OK",
                    },
                },
                tags: ["resources"],
            },
            put: {
                operationId: "putResourceGroup",
                parameters: [
                    {
                        in: "path",
                        name: "id",
                        required: true,
                        schema: {
                            type: "string",
                            format: "uuid",
                        },
                    },
                ],
                requestBody: {
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/PutResourceGroup",
                            },
                        },
                    },
                    required: true,
                },
                responses: {
                    "204": {
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/Unit",
                                },
                            },
                        },
                        description: "No Content",
                    },
                },
                tags: ["resources"],
            },
        },
        "/v1/resources": {
            get: {
                operationId: "listResources",
                responses: {
                    "200": {
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/ResourcesList",
                                },
                            },
                        },
                        description: "OK",
                    },
                },
                tags: ["resources"],
            },
        },
        "/v1/resources/{id}": {
            delete: {
                operationId: "deleteResource",
                parameters: [
                    {
                        in: "path",
                        name: "id",
                        required: true,
                        schema: {
                            type: "string",
                            format: "uuid",
                        },
                    },
                ],
                responses: {
                    "204": {
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/Unit",
                                },
                            },
                        },
                        description: "No Content",
                    },
                },
                tags: ["resources"],
            },
            get: {
                operationId: "getResource",
                parameters: [
                    {
                        in: "path",
                        name: "id",
                        required: true,
                        schema: {
                            type: "string",
                            format: "uuid",
                        },
                    },
                ],
                responses: {
                    "200": {
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/Resource",
                                },
                            },
                        },
                        description: "OK",
                    },
                },
                tags: ["resources"],
            },
            put: {
                operationId: "putResource",
                parameters: [
                    {
                        in: "path",
                        name: "id",
                        required: true,
                        schema: {
                            type: "string",
                            format: "uuid",
                        },
                    },
                ],
                requestBody: {
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/PutResource",
                            },
                        },
                    },
                    required: true,
                },
                responses: {
                    "204": {
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/Unit",
                                },
                            },
                        },
                        description: "No Content",
                    },
                },
                tags: ["resources"],
            },
        },
        "/v1/shared-public-profiles/{slug}": {
            get: {
                operationId: "getSharedPublicProfile",
                parameters: [
                    {
                        in: "path",
                        name: "slug",
                        required: true,
                        schema: {
                            type: "string",
                        },
                    },
                ],
                responses: {
                    "200": {
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/PublicProfile",
                                },
                            },
                        },
                        description: "OK",
                    },
                },
                security: [],
                tags: ["public-profile"],
            },
        },
        "/v1/tenant": {
            get: {
                operationId: "getTenant",
                responses: {
                    "200": {
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/Tenant",
                                },
                            },
                        },
                        description: "The requested tenant.",
                    },
                    "403": {
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/ProblemDetail",
                                },
                            },
                        },
                        description: "The authenticated user can't access this tenant.",
                    },
                    "404": {
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/ProblemDetail",
                                },
                            },
                        },
                        description: "The tenant does not exist.",
                    },
                },
                summary: "Get a tenant.",
                tags: ["tenants"],
            },
            patch: {
                operationId: "patchTenant",
                requestBody: {
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/PatchTenantRequest",
                            },
                        },
                    },
                    required: true,
                },
                responses: {
                    "200": {
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/Tenant",
                                },
                            },
                        },
                        description: "The updated tenant.",
                    },
                    "403": {
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/ProblemDetail",
                                },
                            },
                        },
                        description: "The authenticated user can't access this tenant.",
                    },
                },
                summary: "Updates a tenant.",
                tags: ["tenants"],
            },
            post: {
                operationId: "postTenant",
                requestBody: {
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/CreateTenantRequest",
                            },
                        },
                    },
                    required: true,
                },
                responses: {
                    "201": {
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/Tenant",
                                },
                            },
                        },
                        description: "The created tenant.",
                    },
                    "400": {
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/ProblemDetail",
                                },
                            },
                        },
                        description: "Some field is not valid.",
                    },
                },
                summary: "Creates a tenant.",
                tags: ["tenants"],
            },
        },
        "/v1/third-party-calendar-events": {
            get: {
                operationId: "getThirdPartyCalendarEventsByEventType",
                parameters: [
                    {
                        in: "query",
                        name: "eventTypeId",
                        required: true,
                        schema: {
                            type: "string",
                            format: "uuid",
                        },
                    },
                    {
                        description: "\nThe starting date to get the availability in ISO-8601 format, example: `2021-01-01`.\n\nIf the parameter is not provided, the current day in the UTC time zone is used.\n            ",
                        in: "query",
                        name: "from",
                        required: false,
                        schema: {
                            type: "string",
                            format: "date",
                        },
                    },
                    {
                        description: "\nStarting from the 'from' value, this sets the limit day to verify the event availability.\n\nMinimum allowed is `1`, and maximum is `14`.\n            ",
                        in: "query",
                        name: "days",
                        required: false,
                        schema: {
                            type: "integer",
                            format: "int64",
                            default: 7,
                            maximum: 14,
                            minimum: 1,
                        },
                    },
                ],
                responses: {
                    "200": {
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/ThirdPartyCalendarEventsList",
                                },
                            },
                        },
                        description: "Successful response with the appointments.",
                    },
                    "404": {
                        content: {
                            "application/json": {
                                schema: {},
                            },
                        },
                        description: "The event type doesn't exist.",
                    },
                },
                tags: ["booking"],
            },
        },
        "/v1/upcoming-bookings-email": {
            post: {
                operationId: "triggerUpcomingBookingsEmail",
                requestBody: {
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/SendUpcomingBookingsEmailRequest",
                            },
                        },
                    },
                    required: true,
                },
                responses: {
                    "201": {
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/Unit",
                                },
                            },
                        },
                        description: "Created",
                    },
                },
                tags: ["booking"],
            },
        },
        "/v1/users": {
            get: {
                operationId: "listUsers",
                responses: {
                    "200": {
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/ListUsersResponse",
                                },
                            },
                        },
                        description: "OK",
                    },
                },
                tags: ["user"],
            },
            post: {
                operationId: "createUser",
                requestBody: {
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/PostUserBody",
                            },
                        },
                    },
                    required: true,
                },
                responses: {
                    "200": {
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/Unit",
                                },
                            },
                        },
                        description: "OK",
                    },
                },
                summary: "Creates a user in the tenant of the user making the request..",
                tags: ["user"],
            },
        },
        "/v1/users/{id}": {
            get: {
                operationId: "getUser",
                parameters: [
                    {
                        in: "path",
                        name: "id",
                        required: true,
                        schema: {
                            type: "string",
                            format: "uuid",
                        },
                    },
                ],
                responses: {
                    "200": {
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/User",
                                },
                            },
                        },
                        description: "The user profile response.",
                    },
                    "403": {
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/User",
                                },
                            },
                        },
                        description: "The authenticated user can't access to the requested user.",
                    },
                    "404": {
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/User",
                                },
                            },
                        },
                        description: "The user does not exist.",
                    },
                },
                tags: ["user"],
            },
            patch: {
                operationId: "patchUser",
                parameters: [
                    {
                        in: "path",
                        name: "id",
                        required: true,
                        schema: {
                            type: "string",
                            format: "uuid",
                        },
                    },
                ],
                requestBody: {
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/PatchUserModel",
                            },
                        },
                    },
                    required: true,
                },
                responses: {
                    "200": {
                        content: {
                            "application/json": {
                                schema: {},
                            },
                        },
                        description: "OK",
                    },
                },
                tags: ["user"],
            },
            put: {
                operationId: "putProfile",
                parameters: [
                    {
                        in: "path",
                        name: "id",
                        required: true,
                        schema: {
                            type: "string",
                            format: "uuid",
                        },
                    },
                ],
                requestBody: {
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/PutProfileBody",
                            },
                        },
                    },
                    required: true,
                },
                responses: {
                    "204": {
                        content: {
                            "application/json": {
                                schema: {},
                            },
                        },
                        description: "The profile has been updated successfully.",
                    },
                    "400": {
                        content: {
                            "application/json": {
                                schema: {},
                            },
                        },
                        description: "Some field is not valid.",
                    },
                    "403": {
                        content: {
                            "application/json": {
                                schema: {},
                            },
                        },
                        description: "The authenticated user can't modify this user.",
                    },
                    "404": {
                        content: {
                            "application/json": {
                                schema: {},
                            },
                        },
                        description: "The user does not exist.",
                    },
                    "409": {
                        content: {
                            "application/json": {
                                schema: {},
                            },
                        },
                        description: "The 'slug' is not available.",
                    },
                },
                tags: ["user"],
            },
        },
        "/v1/workflows": {
            get: {
                operationId: "listWorkflows",
                responses: {
                    "200": {
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/WorkflowsList",
                                },
                            },
                        },
                        description: "The workflows list.",
                    },
                },
                summary: "List user accessible workflows.",
                tags: ["workflows"],
            },
        },
        "/v1/workflows/{id}": {
            delete: {
                operationId: "deleteWorkflow",
                parameters: [
                    {
                        in: "path",
                        name: "id",
                        required: true,
                        schema: {
                            type: "string",
                            format: "uuid",
                        },
                    },
                ],
                responses: {
                    "204": {
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/Unit",
                                },
                            },
                        },
                        description: "The workflow has been deleted successfully.",
                    },
                    "403": {
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/Unit",
                                },
                            },
                        },
                        description: "The authenticated user can't has no permissions over this resource.",
                    },
                },
                summary: "Deletes a workflow.",
                tags: ["workflows"],
            },
            get: {
                operationId: "getWorkflow",
                parameters: [
                    {
                        in: "path",
                        name: "id",
                        required: true,
                        schema: {
                            type: "string",
                            format: "uuid",
                        },
                    },
                ],
                responses: {
                    "200": {
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/Workflow",
                                },
                            },
                        },
                        description: "The workflows.",
                    },
                },
                summary: "Get a workflow.",
                tags: ["workflows"],
            },
            put: {
                operationId: "putWorkflow",
                parameters: [
                    {
                        in: "path",
                        name: "id",
                        required: true,
                        schema: {
                            type: "string",
                            format: "uuid",
                        },
                    },
                ],
                requestBody: {
                    content: {
                        "application/json": {
                            schema: {
                                oneOf: [
                                    {
                                        $ref: "#/components/schemas/PutAfterConfirmingBookingWorkflowRequest",
                                    },
                                ],
                            },
                        },
                    },
                    required: true,
                },
                responses: {
                    "204": {
                        content: {
                            "application/json": {
                                schema: {},
                            },
                        },
                        description: "The workflow has been created or updated successfully.",
                    },
                    "400": {
                        content: {
                            "application/json": {
                                schema: {},
                            },
                        },
                        description: "Some field is not valid.",
                    },
                    "403": {
                        content: {
                            "application/json": {
                                schema: {},
                            },
                        },
                        description: "The authenticated user can't has no permissions over this resource.",
                    },
                },
                summary: "Creates or updates a workflow.",
                tags: ["workflows"],
            },
        },
    },
    components: {
        schemas: {
            AcceptedOrganizationInvite: {
                type: "object",
                properties: {
                    code: {
                        type: "string",
                    },
                },
                required: ["code"],
            },
            AfterBookingRedirect: {
                type: "object",
                properties: {
                    url: {
                        type: "string",
                        format: "uri",
                    },
                },
                required: ["url"],
            },
            AfterConfirmingBookingTrigger: {
                allOf: [
                    {
                        $ref: "#/components/schemas/WorkflowTrigger",
                    },
                    {
                        type: ["object"],
                        example: null,
                        properties: {
                            after: {
                                type: "string",
                                description: "How after confirming the booking the workflow should be executed in ISO8601 duration format. For executing the workflow 15 minutes after confirming, PT15M is a valid value. If we want the workflow to be executed straightaway, null is a valid value.",
                            },
                        },
                    },
                ],
            },
            AfterConfirmingBookingWorkflowAction: {
                allOf: [
                    {
                        $ref: "#/components/schemas/WorkflowAction",
                    },
                    {
                        type: ["object"],
                        example: null,
                        properties: {
                            type: {
                                type: "string",
                            },
                        },
                    },
                ],
                discriminator: {
                    propertyName: "type",
                },
                required: ["type"],
            },
            AnsweredQuestionModel: {
                type: "object",
                properties: {
                    answer: {
                        type: "string",
                    },
                    id: {
                        type: "string",
                    },
                    label: {
                        type: "string",
                    },
                },
                required: ["id", "label"],
            },
            ApiKeyModel: {
                type: "object",
                properties: {
                    id: {
                        type: "string",
                        format: "uuid",
                    },
                    key: {
                        type: "string",
                    },
                    name: {
                        type: "string",
                    },
                },
                required: ["id", "key"],
            },
            ApiKeysListModel: {
                type: "object",
                properties: {
                    apiKeys: {
                        type: "array",
                        items: {
                            $ref: "#/components/schemas/ApiKeyModel",
                        },
                    },
                },
                required: ["apiKeys"],
            },
            AssociatedWorkflowModel: {
                type: "object",
                description: "AssociatedWorkflow",
                properties: {
                    id: {
                        type: "string",
                        format: "uuid",
                        description: "The workflow id",
                    },
                },
                required: ["id"],
            },
            AvailableInGroupRule: {
                type: "object",
                properties: {
                    group: {
                        $ref: "#/components/schemas/ResourceGroupId",
                    },
                    min: {
                        type: "integer",
                        format: "int32",
                        minimum: 1,
                    },
                },
                required: ["group", "min"],
            },
            BeforeEventTrigger: {
                allOf: [
                    {
                        $ref: "#/components/schemas/WorkflowTrigger",
                    },
                    {
                        type: ["object"],
                        example: null,
                        properties: {
                            before: {
                                type: "string",
                                format: "duration",
                                description: "How much before the actual event the workflow needs to be triggered in ISO8601 duration format.For executing the workflow 15 minutes before the event, PT15M is a valid value.",
                            },
                        },
                    },
                ],
                required: ["before"],
            },
            BookedEventType: {
                type: "object",
                properties: {
                    id: {
                        type: "string",
                        format: "uuid",
                    },
                    name: {
                        type: "string",
                    },
                    owner: {
                        $ref: "#/components/schemas/BookedEventTypeOwnerUser",
                    },
                    tags: {
                        type: "object",
                        additionalProperties: {
                            type: "string",
                        },
                        description: "Arbitrary key/value collection. Useful for API users to store metadata.",
                    },
                },
                required: ["id", "name", "owner", "tags"],
            },
            BookedEventTypeOwnerUser: {
                type: "object",
                properties: {
                    email: {
                        type: "string",
                    },
                    externalId: {
                        type: "string",
                    },
                    id: {
                        type: "string",
                        format: "uuid",
                    },
                },
                required: ["email", "id"],
            },
            BookedResource: {
                type: "object",
                properties: {
                    id: {
                        type: "string",
                        format: "uuid",
                    },
                    name: {
                        type: "string",
                    },
                },
                required: ["id", "name"],
            },
            BookerModel: {
                type: "object",
                properties: {
                    email: {
                        type: "string",
                    },
                },
                required: ["email"],
            },
            BookerPhoneLocation: {
                allOf: [
                    {
                        $ref: "#/components/schemas/LocationModel",
                    },
                    {
                        type: ["object"],
                        example: null,
                        properties: {
                            questionId: {
                                type: "string",
                            },
                        },
                    },
                ],
                required: ["questionId"],
            },
            BookerPhoneOption: {
                allOf: [
                    {
                        $ref: "#/components/schemas/LocationOptionModel",
                    },
                ],
            },
            BookerSelectionLocation: {
                allOf: [
                    {
                        $ref: "#/components/schemas/LocationModel",
                    },
                    {
                        type: ["object"],
                        example: null,
                        properties: {
                            questionId: {
                                type: "string",
                            },
                        },
                    },
                ],
                required: ["questionId"],
            },
            Booking: {
                type: "object",
                properties: {
                    answeredQuestions: {
                        type: "array",
                        items: {
                            $ref: "#/components/schemas/AnsweredQuestionModel",
                        },
                    },
                    bookedResources: {
                        type: "array",
                        items: {
                            $ref: "#/components/schemas/BookedResource",
                        },
                        uniqueItems: true,
                    },
                    booker: {
                        $ref: "#/components/schemas/BookerModel",
                    },
                    cancellation: {
                        $ref: "#/components/schemas/BookingCancellationModel",
                        description: "Not null if the booking has been cancelled.",
                    },
                    conferenceLink: {
                        type: "string",
                        format: "uri",
                    },
                    confirmedAt: {
                        type: "string",
                        format: "date-time",
                    },
                    eventType: {
                        $ref: "#/components/schemas/BookedEventType",
                    },
                    heldUntil: {
                        type: "string",
                        format: "date-time",
                    },
                    id: {
                        type: "string",
                        format: "uuid",
                    },
                    interval: {
                        $ref: "#/components/schemas/InstantInterval",
                    },
                    notes: {
                        type: "string",
                        description: "Additional notes added by the booker when submitting the booking.",
                    },
                    price: {
                        $ref: "#/components/schemas/MonetaryAmount",
                    },
                    privateNotes: {
                        type: "array",
                        items: {
                            type: "string",
                        },
                        uniqueItems: true,
                    },
                    status: {
                        type: "string",
                        description: "Booking status.\n * `CONFIRMED` - Booking is confirmed.\n * `ON_HOLD` - Booking is on hold, this means the slot and the related resources are blocked till the hold is released.\n * `CANCELED` - Booking has been canceled.",
                        enum: ["CONFIRMED", "ON_HOLD", "CANCELED"],
                    },
                    units: {
                        type: "integer",
                        format: "int32",
                        description: "Booked units.",
                    },
                },
                required: [
                    "answeredQuestions",
                    "bookedResources",
                    "booker",
                    "eventType",
                    "id",
                    "interval",
                    "privateNotes",
                    "status",
                ],
            },
            BookingCancellationModel: {
                type: "object",
                properties: {
                    cancelledAt: {
                        type: "string",
                        format: "date-time",
                    },
                    cancelledBy: {
                        type: "string",
                        enum: ["ORGANIZER", "BOOKER"],
                    },
                    reason: {
                        type: "string",
                    },
                },
                required: ["cancelledAt", "cancelledBy"],
            },
            BookingChanged: {
                allOf: [
                    {
                        $ref: "#/components/schemas/Webhook",
                    },
                    {
                        type: ["object"],
                        example: null,
                        properties: {
                            new: {
                                $ref: "#/components/schemas/Booking",
                            },
                            old: {
                                $ref: "#/components/schemas/Booking",
                            },
                        },
                    },
                ],
                required: ["new"],
            },
            BookingConfirmationNotifications: {
                type: "object",
                description: "Model representing confirmation notifications.",
                properties: {
                    sms: {
                        $ref: "#/components/schemas/BookingSmsNotification",
                        description: "SMS notification settings for confirmation.",
                    },
                    whatsapp: {
                        $ref: "#/components/schemas/BookingWhatsappNotification",
                        description: "Webhook notification settings for reminders.",
                    },
                },
            },
            BookingMode: {
                type: "object",
                description: "The booking mode configuration.",
                discriminator: {
                    propertyName: "type",
                },
                properties: {
                    type: {
                        type: "string",
                    },
                },
                required: ["type"],
            },
            BookingNotifications: {
                type: "object",
                description: "Model representing booking notifications.",
                properties: {
                    confirmation: {
                        $ref: "#/components/schemas/BookingConfirmationNotifications",
                        description: "Confirmation notifications settings.",
                    },
                    reminders: {
                        type: "array",
                        description: "Set of reminder notifications.",
                        items: {
                            $ref: "#/components/schemas/BookingReminderNotifications",
                        },
                        uniqueItems: true,
                    },
                },
            },
            BookingReminderNotifications: {
                type: "object",
                description: "Model representing reminder notifications.",
                properties: {
                    sms: {
                        $ref: "#/components/schemas/BookingSmsNotification",
                        description: "SMS notification settings for reminders.",
                    },
                    timeBefore: {
                        type: "string",
                        format: "duration",
                        description: "Time before the event to send the reminder.",
                    },
                    webhook: {
                        $ref: "#/components/schemas/BookingWebhookNotification",
                        description: "Webhook notification settings for reminders.",
                    },
                    whatsapp: {
                        $ref: "#/components/schemas/BookingWhatsappNotification",
                        description: "Webhook notification settings for reminders.",
                    },
                },
                required: ["sms", "timeBefore", "webhook", "whatsapp"],
            },
            BookingRules: {
                type: "object",
                properties: {
                    afterBuffer: {
                        type: "string",
                        format: "duration",
                    },
                    beforeBuffer: {
                        type: "string",
                        format: "duration",
                    },
                    busyIntervals: {
                        type: "array",
                        items: {
                            $ref: "#/components/schemas/InstantInterval",
                        },
                        uniqueItems: true,
                    },
                    checkAvailabilityInCalendars: {
                        type: "array",
                        items: {
                            $ref: "#/components/schemas/ThirdPartyCalendarId",
                        },
                        uniqueItems: true,
                    },
                    enabled: {
                        type: "boolean",
                        description: "When set to false, it will never be available.",
                    },
                    maxBookingNotice: {
                        type: "string",
                        format: "duration",
                    },
                    maxBookingsPerTimeUnit: {
                        $ref: "#/components/schemas/MaxBookingsPerTimeUnit",
                    },
                    maxConcurrentBookings: {
                        type: "integer",
                        format: "int32",
                        description: "Limits how many concurrent bookings for this event type can happen at the same time. E.G, If it is set to 1, after one booking, the time slot is not available anymore. If null, then unlimited bookings can be made for the same time slot (unless 'availableUnits' is set).",
                        minimum: 1,
                    },
                    minBookingNotice: {
                        type: "string",
                        format: "duration",
                    },
                    repeatingAvailability: {
                        $ref: "#/components/schemas/RepeatingAvailabilityModel",
                    },
                    resourceRules: {
                        $ref: "#/components/schemas/ResourceRules",
                    },
                    units: {
                        $ref: "#/components/schemas/Units",
                    },
                },
                required: ["enabled"],
            },
            BookingSmsNotification: {
                type: "object",
                description: "Model representing SMS notification settings.",
                properties: {
                    enabled: {
                        type: "boolean",
                        description: "Flag indicating if SMS notifications are enabled.",
                    },
                },
                required: ["enabled"],
            },
            BookingWebhookNotification: {
                type: "object",
                description: "Model representing webhook notification settings.",
                properties: {
                    enabled: {
                        type: "boolean",
                        description: "Flag indicating if webhook notifications are enabled. Webhook config will be inherited from the tenant config (only available for enterprise customers).",
                    },
                },
                required: ["enabled"],
            },
            BookingWhatsappNotification: {
                type: "object",
                description: "Model representing whatsapp notification settings.",
                properties: {
                    additionalInformation: {
                        type: "string",
                        description: "Additional information to be appended to the whatsapp message.",
                        maxLength: 1024,
                        minLength: 0,
                    },
                    enabled: {
                        type: "boolean",
                        description: "Flag indicating if whatsapp notifications are enabled.",
                    },
                },
                required: ["enabled"],
            },
            BookingsList: {
                type: "object",
                properties: {
                    bookings: {
                        type: "array",
                        items: {
                            $ref: "#/components/schemas/PublicBooking",
                        },
                    },
                },
                required: ["bookings"],
            },
            Calendar: {
                type: "object",
                properties: {
                    defaultTimeZone: {
                        type: "string",
                    },
                    description: {
                        type: "string",
                    },
                    id: {
                        type: "string",
                        format: "uuid",
                        description: "The invitation id.",
                    },
                    name: {
                        type: "string",
                    },
                    owner: {
                        oneOf: [
                            {
                                $ref: "#/components/schemas/CalendarOwnerOrg",
                            },
                            {
                                $ref: "#/components/schemas/CalendarOwnerUser",
                            },
                        ],
                    },
                    tags: {
                        type: "object",
                        additionalProperties: {
                            type: "string",
                        },
                        description: "Arbitrary key/value collection. Useful for API users to store metadata.",
                    },
                },
                required: ["id", "name", "owner", "tags"],
            },
            CalendarEvent: {
                type: "object",
                properties: {
                    attachments: {
                        type: "array",
                        description: "Unique collection of event attachments.",
                        items: {
                            $ref: "#/components/schemas/CalendarEventAttachment",
                        },
                        uniqueItems: true,
                    },
                    attendees: {
                        type: "array",
                        description: "Collection of the attendees.",
                        items: {
                            $ref: "#/components/schemas/CalendarEventAttendee",
                        },
                        uniqueItems: true,
                    },
                    calendarId: {
                        type: "string",
                        format: "uuid",
                        description: "The calendar id this event belongs to.",
                    },
                    comments: {
                        type: "array",
                        description: "Collection of event comments.",
                        items: {
                            type: "string",
                        },
                        uniqueItems: true,
                    },
                    description: {
                        type: "string",
                        description: "Description of the event.",
                    },
                    id: {
                        type: "string",
                        format: "uuid",
                        description: "The event id",
                    },
                    interval: {
                        $ref: "#/components/schemas/ZonedDateTimeInterval",
                        description: "Interval indicating when the event is happening. It's optional, an event without an interval is a valid event in TimeTime. It can be useful to keep track of pending tasks that have not a date in the moment of its creation.",
                    },
                    locations: {
                        type: "array",
                        description: "Collection of event locations. An event will have typically no more than one location, but it can also have more than one, for example, a physical room and an online conference link.",
                        items: {
                            $ref: "#/components/schemas/CalendarEventLocation",
                        },
                        uniqueItems: true,
                    },
                    notifications: {
                        type: "array",
                        description: "Collection of event notifications.",
                        items: {
                            oneOf: [
                                {
                                    $ref: "#/components/schemas/EmailConfirmationCalendarEventNotification",
                                },
                                {
                                    $ref: "#/components/schemas/SmsBeforeCalendarEventNotification",
                                },
                                {
                                    $ref: "#/components/schemas/SmsConfirmationCalendarEventNotification",
                                },
                                {
                                    $ref: "#/components/schemas/WhatsappBeforeCalendarEventNotification",
                                },
                                {
                                    $ref: "#/components/schemas/WhatsappConfirmationCalendarEventNotification",
                                },
                            ],
                        },
                        uniqueItems: true,
                    },
                    status: {
                        type: "string",
                        description: "Status of the event.",
                        enum: ["CONFIRMED", "CANCELLED", "TENTATIVE"],
                    },
                    summary: {
                        type: "string",
                        description: "Summary (title) of the event.",
                    },
                    tags: {
                        type: "object",
                        additionalProperties: {
                            type: "string",
                        },
                        description: "Arbitrary key/value collection. Useful for API users to store metadata.",
                    },
                },
                required: [
                    "attachments",
                    "attendees",
                    "calendarId",
                    "comments",
                    "id",
                    "locations",
                    "notifications",
                    "status",
                    "tags",
                ],
            },
            CalendarEventAttachment: {
                type: "object",
                properties: {
                    mimeType: {
                        type: "string",
                        description: "Attachment MIME type as defined in RFC 2045 and 2046. Example 'image/jpeg'. It'll be helpful for the frontend apps to show images for example.",
                        example: "image/jpeg",
                        maxLength: 64,
                        minLength: 0,
                    },
                    url: {
                        type: "string",
                        format: "uri",
                        description: "URI of the attachment. The TimeTime server won't try to fetch it.",
                    },
                },
                required: ["url"],
            },
            CalendarEventAttendee: {
                type: "object",
                properties: {
                    comment: {
                        type: "string",
                        description: "The attendee's response comment.",
                    },
                    displayName: {
                        type: "string",
                        description: "The attendee's name, if available.",
                    },
                    email: {
                        type: "string",
                        description: "The attendee's email address.",
                    },
                    id: {
                        type: "string",
                        format: "uuid",
                        description: "The attendee id.",
                    },
                    invitation: {
                        $ref: "#/components/schemas/CalendarEventAttendeeInvitation",
                        description: "The invitation",
                    },
                    managementUrl: {
                        type: "string",
                        format: "uri",
                        description: "The public URL the attendee can use to reply if they accept or not the invite.\nWhen the attendee status is NEEDS_ACTION, this URL should be sent to the attendee so they can reply.",
                    },
                    organizer: {
                        type: "boolean",
                        description: "Whether the attendee is the organizer of the event.",
                    },
                    phone: {
                        type: "string",
                        description: "The attendee's phone number, if available, in e164 format.",
                        maxLength: 36,
                        minLength: 0,
                    },
                    status: {
                        type: "string",
                        description: "The attendee's response status.",
                        enum: ["NEEDS_ACTION", "DECLINED", "TENTATIVE", "ACCEPTED"],
                    },
                },
                required: ["id", "organizer", "status"],
            },
            CalendarEventAttendeeInvitation: {
                type: "object",
                properties: {
                    description: {
                        type: "string",
                    },
                    displayTimeMode: {
                        type: "string",
                        description: "Configures how TimeTime will show the invitation event time.\n * `EXACT` - It'll show the exact start/end time of the event.\n * `FUZZY` - It'll show a fuzzy version of the event time, like 'MORNING', 'AFTERNOON'... * `START_DATE` - It'll show the starting date day, without time (hours, minutes...) information.",
                        enum: ["EXACT", "FUZZY", "START_DATE"],
                    },
                    id: {
                        type: "string",
                        format: "uuid",
                        description: "The invitation id.",
                    },
                    subtitle: {
                        type: "string",
                    },
                    summary: {
                        type: "string",
                    },
                },
                required: ["displayTimeMode", "id"],
            },
            CalendarEventAttendeeReplyChange: {
                allOf: [
                    {
                        $ref: "#/components/schemas/CalendarEventDiff",
                    },
                    {
                        type: ["object"],
                        example: null,
                        properties: {
                            attendee: {
                                $ref: "#/components/schemas/CalendarEventAttendee",
                            },
                        },
                    },
                ],
                required: ["attendee"],
            },
            CalendarEventAttendeeRequest: {
                type: "object",
                properties: {
                    comment: {
                        type: "string",
                        description: "The attendee's response comment.",
                        maxLength: 1024,
                        minLength: 0,
                    },
                    displayName: {
                        type: "string",
                        description: "The attendee's name, if available.",
                        maxLength: 256,
                        minLength: 0,
                    },
                    email: {
                        type: "string",
                        description: "The attendee's email address, if available.",
                        maxLength: 4096,
                        minLength: 0,
                    },
                    id: {
                        type: "string",
                        format: "uuid",
                        description: "The attendee id.",
                    },
                    invitation: {
                        $ref: "#/components/schemas/PutCalendarEventAttendeeInvitationRequest",
                        description: "The invitation",
                    },
                    phone: {
                        type: "string",
                        description: "The attendee's phone number, if available, in e164 format.",
                        maxLength: 36,
                        minLength: 0,
                    },
                    status: {
                        type: "string",
                        description: "The attendee's response status.",
                        enum: ["NEEDS_ACTION", "DECLINED", "TENTATIVE", "ACCEPTED"],
                    },
                },
            },
            CalendarEventChanged: {
                allOf: [
                    {
                        $ref: "#/components/schemas/Webhook",
                    },
                    {
                        type: ["object"],
                        example: null,
                        properties: {
                            new: {
                                $ref: "#/components/schemas/CalendarEvent",
                            },
                            semanticDiff: {
                                type: "array",
                                items: {
                                    oneOf: [
                                        {
                                            $ref: "#/components/schemas/CalendarEventAttendeeReplyChange",
                                        },
                                        {
                                            $ref: "#/components/schemas/CalendarEventScheduled",
                                        },
                                        {
                                            $ref: "#/components/schemas/CalendarEventStatusChanged",
                                        },
                                    ],
                                },
                            },
                        },
                    },
                ],
                required: ["new", "semanticDiff"],
            },
            CalendarEventDiff: {
                type: "object",
                description: "This is kind of syntax sugar to improve the Developer Experience for the webhook receiver. Some of the changes in the Calendar Event receive an special treatment and have a name and additional information.\nNot all Calendar Event changes have an specific 'diff' value.",
                discriminator: {
                    propertyName: "type",
                },
                properties: {
                    type: {
                        type: "string",
                    },
                },
                required: ["type"],
            },
            CalendarEventInvitation: {
                type: "object",
                properties: {
                    description: {
                        type: "string",
                    },
                    event: {
                        $ref: "#/components/schemas/CalendarEventInvitationEventModel",
                    },
                    id: {
                        type: "string",
                        format: "uuid",
                    },
                    invitedAttendee: {
                        $ref: "#/components/schemas/PublicInvitedAttendee",
                    },
                    subtitle: {
                        type: "string",
                    },
                    summary: {
                        type: "string",
                    },
                },
                required: ["event", "id", "invitedAttendee"],
            },
            CalendarEventInvitationEvent: {
                type: "object",
                discriminator: {
                    propertyName: "type",
                },
                properties: {
                    type: {
                        type: "string",
                    },
                },
                required: ["type"],
            },
            CalendarEventInvitationEventModel: {
                type: "object",
                properties: {
                    interval: {
                        oneOf: [
                            {
                                $ref: "#/components/schemas/ConcreteCalendarEventInvitationInterval",
                            },
                            {
                                $ref: "#/components/schemas/FuzzyCalendarEventInvitationInterval",
                            },
                            {
                                $ref: "#/components/schemas/StartDateCalendarEventInvitationInterval",
                            },
                        ],
                    },
                },
            },
            CalendarEventLocation: {
                type: "object",
                properties: {
                    text: {
                        type: "string",
                        description: "Event location in a free text form. It won't be processed by the server.",
                        maxLength: 4096,
                        minLength: 0,
                    },
                },
                required: ["text"],
            },
            CalendarEventNotification: {
                type: "object",
                description: "Calendar Event notification.",
                discriminator: {
                    propertyName: "type",
                },
                properties: {
                    type: {
                        type: "string",
                    },
                },
                required: ["type"],
            },
            CalendarEventScheduled: {
                allOf: [
                    {
                        $ref: "#/components/schemas/CalendarEventDiff",
                    },
                    {
                        type: ["object"],
                        example: null,
                        properties: {
                            interval: {
                                $ref: "#/components/schemas/ZonedDateTimeInterval",
                            },
                        },
                    },
                ],
            },
            CalendarEventStatusChanged: {
                allOf: [
                    {
                        $ref: "#/components/schemas/CalendarEventDiff",
                    },
                    {
                        type: ["object"],
                        example: null,
                        properties: {
                            new: {
                                type: "string",
                                enum: ["CONFIRMED", "CANCELLED", "TENTATIVE"],
                            },
                            old: {
                                type: "string",
                                enum: ["CONFIRMED", "CANCELLED", "TENTATIVE"],
                            },
                        },
                    },
                ],
                required: ["new", "old"],
            },
            CalendarEventsList: {
                type: "object",
                properties: {
                    items: {
                        type: "array",
                        items: {
                            $ref: "#/components/schemas/CalendarEvent",
                        },
                    },
                },
                required: ["items"],
            },
            CalendarOwner: {
                type: "object",
                description: "Calendar owner",
                discriminator: {
                    propertyName: "type",
                },
                properties: {
                    type: {
                        type: "string",
                    },
                },
                required: ["type"],
            },
            CalendarOwnerOrg: {
                allOf: [
                    {
                        $ref: "#/components/schemas/CalendarOwner",
                    },
                    {
                        type: ["object"],
                        example: null,
                        properties: {
                            id: {
                                type: "string",
                                format: "uuid",
                            },
                        },
                    },
                ],
                description: "Org calendar owner",
                required: ["id"],
            },
            CalendarOwnerUser: {
                allOf: [
                    {
                        $ref: "#/components/schemas/CalendarOwner",
                    },
                    {
                        type: ["object"],
                        example: null,
                        properties: {
                            id: {
                                type: "string",
                                format: "uuid",
                            },
                        },
                    },
                ],
                description: "User calendar owner",
                required: ["id"],
            },
            CalendarsList: {
                type: "object",
                properties: {
                    items: {
                        type: "array",
                        items: {
                            $ref: "#/components/schemas/Calendar",
                        },
                    },
                },
                required: ["items"],
            },
            CancelBookingRequest: {
                type: "object",
                properties: {
                    reason: {
                        type: "string",
                        maxLength: 1024,
                        minLength: 0,
                    },
                },
            },
            ConcreteCalendarEventInvitationInterval: {
                allOf: [
                    {
                        $ref: "#/components/schemas/CalendarEventInvitationEvent",
                    },
                    {
                        type: ["object"],
                        example: null,
                        properties: {
                            interval: {
                                $ref: "#/components/schemas/ZonedDateTimeInterval",
                                description: "Interval indicating when the event is happening. It's optional, an event without an interval is a valid event in TimeTime. It can be useful to keep track of pending tasks that have not a date in the moment of its creation.",
                            },
                        },
                    },
                ],
                required: ["interval"],
            },
            CreateApiKeyBody: {
                type: "object",
                properties: {
                    name: {
                        type: "string",
                    },
                },
            },
            CreateApiKeyResponseModel: {
                type: "object",
                properties: {
                    id: {
                        type: "string",
                        format: "uuid",
                    },
                    key: {
                        type: "string",
                    },
                },
                required: ["id", "key"],
            },
            CreateBookingRequest: {
                type: "object",
                properties: {
                    answers: {
                        type: "object",
                        additionalProperties: {
                            type: "string",
                        },
                    },
                    bookerEmail: {
                        type: "string",
                        deprecated: true,
                    },
                    eventTypeId: {
                        type: "string",
                        format: "uuid",
                    },
                    notes: {
                        type: "string",
                        maxLength: 2048,
                        minLength: 0,
                    },
                    start: {
                        type: "string",
                        format: "date-time",
                    },
                    units: {
                        type: "integer",
                        format: "int32",
                        minimum: 1,
                    },
                },
                required: ["answers", "eventTypeId", "start"],
            },
            CreateLoginTokenRequest: {
                type: "object",
                properties: {
                    externalId: {
                        type: "string",
                        description: "Id on an external system. Typically the user id on the tenant service side.",
                    },
                },
                required: ["externalId"],
            },
            CreateTenantRequest: {
                type: "object",
                properties: {
                    id: {
                        type: "string",
                        description: "Id of the tenant",
                        maxLength: 36,
                        minLength: 3,
                        pattern: "^[a-zà-ú0-9\\uD83C-\\uDBFF\\uDC00-\\uDFFF]+(?:-[a-zà-ú0-9\\uD83C-\\uDBFF\\uDC00-\\uDFFF]+)*$",
                    },
                    name: {
                        type: "string",
                        description: "Name of the tenant",
                    },
                },
                required: ["id"],
            },
            EmailConfirmationCalendarEventNotification: {
                allOf: [
                    {
                        $ref: "#/components/schemas/CalendarEventNotification",
                    },
                    {
                        type: ["object"],
                        example: null,
                        properties: {
                            additionalInformation: {
                                type: "string",
                                description: "Additional information to be appended to the notification.",
                                maxLength: 1024,
                                minLength: 0,
                            },
                            email: {
                                type: "string",
                                description: "The email address of the receiver.",
                            },
                            id: {
                                type: "string",
                                format: "uuid",
                                description: "The notification id.",
                            },
                            locale: {
                                type: "string",
                                format: "locale",
                                description: "Locale to be used to send the notification.",
                            },
                        },
                    },
                ],
                required: ["email", "id", "locale"],
            },
            EmailQuestion: {
                allOf: [
                    {
                        $ref: "#/components/schemas/EventTypeQuestion",
                    },
                    {
                        type: ["object"],
                        example: null,
                        properties: {
                            canBeDeleted: {
                                type: "boolean",
                                readOnly: true,
                            },
                        },
                    },
                ],
                required: ["id", "label"],
            },
            EvaluatedTimeSlotModel: {
                type: "object",
                properties: {
                    end: {
                        type: "string",
                        format: "date-time",
                    },
                    price: {
                        $ref: "#/components/schemas/MonetaryAmount",
                    },
                    score: {
                        type: "number",
                        format: "float",
                    },
                    start: {
                        type: "string",
                        format: "date-time",
                    },
                },
                required: ["end", "score", "start"],
            },
            EventInvitationReply: {
                type: "object",
                description: "Event invitation reply",
                discriminator: {
                    propertyName: "type",
                },
                properties: {
                    comment: {
                        type: "string",
                    },
                    type: {
                        type: "string",
                    },
                },
                required: ["type"],
            },
            EventInvitationReplyAccept: {
                allOf: [
                    {
                        $ref: "#/components/schemas/EventInvitationReply",
                    },
                    {
                        type: ["object"],
                        example: null,
                        properties: {
                            comment: {
                                type: "string",
                                description: "The response comment",
                            },
                        },
                    },
                ],
            },
            EventInvitationReplyDecline: {
                allOf: [
                    {
                        $ref: "#/components/schemas/EventInvitationReply",
                    },
                    {
                        type: ["object"],
                        example: null,
                        properties: {
                            comment: {
                                type: "string",
                                description: "The response comment",
                            },
                        },
                    },
                ],
            },
            EventType: {
                type: "object",
                properties: {
                    afterBuffer: {
                        type: "string",
                    },
                    availableUnits: {
                        type: "integer",
                        format: "int32",
                        description: "For event types accepting multi-bookings, this sets the maximum number of people/resources that can book / be booked at the same time. Examples: \n- Restaurants: This is maximum number of people that can be attended at the same time.\n- Bikes store: This is the amount of bikes available.",
                    },
                    beforeBuffer: {
                        type: "string",
                    },
                    bookingMode: {
                        oneOf: [
                            {
                                $ref: "#/components/schemas/HoldBookingMode",
                            },
                            {
                                $ref: "#/components/schemas/InstantBookingMode",
                            },
                        ],
                    },
                    busyIntervals: {
                        type: "array",
                        items: {
                            $ref: "#/components/schemas/InstantInterval",
                        },
                        uniqueItems: true,
                    },
                    description: {
                        type: "string",
                    },
                    duration: {
                        type: "string",
                        format: "duration",
                        description: "It defines the duration of the event type.\nAllowed format is ISO-8601 duration, maximum unit allowed is days.",
                        example: "PT1H",
                    },
                    enabled: {
                        type: "boolean",
                        description: "When set to false, it will never be available.",
                    },
                    fullSlug: {
                        type: "string",
                    },
                    hosts: {
                        type: "array",
                        items: {
                            $ref: "#/components/schemas/EventTypeHostModel",
                        },
                        uniqueItems: true,
                    },
                    i18n: {
                        $ref: "#/components/schemas/EventTypeI18nConfig",
                        description: "Internationalization config for the event type.",
                    },
                    id: {
                        type: "string",
                        format: "uuid",
                    },
                    imageUrl: {
                        type: "string",
                        format: "uri",
                    },
                    location: {
                        oneOf: [
                            {
                                $ref: "#/components/schemas/BookerPhoneLocation",
                            },
                            {
                                $ref: "#/components/schemas/BookerSelectionLocation",
                            },
                            {
                                $ref: "#/components/schemas/FixedLocation",
                            },
                            {
                                $ref: "#/components/schemas/GoogleMeetLocation",
                            },
                            {
                                $ref: "#/components/schemas/MicrosoftOutlookLocation",
                            },
                        ],
                    },
                    maxBookingNotice: {
                        type: "string",
                    },
                    maxBookingsPerTimeUnit: {
                        $ref: "#/components/schemas/MaxBookingsPerTimeUnit",
                    },
                    maxConcurrentBookings: {
                        type: "integer",
                        format: "int32",
                        description: "Limits how many concurrent bookings for this event type can happen at the same time. E.G, If it is set to 1, after one booking, the time slot is not available anymore. If null, then unlimited bookings can be made for the same time slot (unless 'availableUnits' is set).",
                    },
                    maxUnitsPerBooking: {
                        type: "integer",
                        format: "int32",
                        description: "Whenever the 'availableUnits' is set, this sets the limit of how many 'units' can be booked per booking. Examples: \n- Restaurants: This the maximum party size that can make a reservation, for example, up to groups of 10 people max.\n- City tour: The maximum number of people that each of your tour guides can manage.",
                    },
                    minBookingNotice: {
                        type: "string",
                    },
                    minUnitsPerBooking: {
                        type: "integer",
                        format: "int32",
                    },
                    name: {
                        type: "string",
                    },
                    notifications: {
                        $ref: "#/components/schemas/BookingNotifications",
                    },
                    pricingPolicy: {
                        $ref: "#/components/schemas/LinkedPricingPolicy",
                    },
                    questions: {
                        type: "array",
                        items: {
                            oneOf: [
                                {
                                    $ref: "#/components/schemas/EmailQuestion",
                                },
                                {
                                    $ref: "#/components/schemas/ImageQuestion",
                                },
                                {
                                    $ref: "#/components/schemas/LocationQuestion",
                                },
                                {
                                    $ref: "#/components/schemas/PasswordQuestion",
                                },
                                {
                                    $ref: "#/components/schemas/PhoneQuestion",
                                },
                                {
                                    $ref: "#/components/schemas/TextQuestion",
                                },
                            ],
                        },
                    },
                    redirectAfterBooking: {
                        $ref: "#/components/schemas/AfterBookingRedirect",
                    },
                    repeatingAvailability: {
                        $ref: "#/components/schemas/RepeatingAvailabilityModel",
                    },
                    resourceRules: {
                        $ref: "#/components/schemas/ResourceRules",
                    },
                    slug: {
                        type: "string",
                    },
                    step: {
                        type: "string",
                        format: "duration",
                        description: "It defines increments for showing the availability slots, example:\n- An step of 15 minutes (PT15M) of a 1 hour meeting, will show as bookable slots: 10:00, 10:15, 10:30, 10:45... \n- An step of 1 hour (PT1H) of a 1 hour meeting, will show as bookable slots: 10:00, 11:00, 12:00, 13:00... \nAllowed format is ISO-8601 duration, maximum unit allowed is days.",
                        example: "PT30M",
                    },
                    tags: {
                        type: "object",
                        additionalProperties: {
                            type: "string",
                        },
                    },
                    thirdPartyCalendars: {
                        $ref: "#/components/schemas/ThirdPartyCalendarsModel",
                    },
                    unitsLabel: {
                        type: "string",
                        description: "Units is a very generic concept, depending on the use case units could be referring to 'people', to 'bikes'... etc. The units label is to be able to set a custom label for the units field, that will appear in the booking page next to the 'units' selector.",
                    },
                    userId: {
                        type: "string",
                        format: "uuid",
                    },
                    workflows: {
                        type: "array",
                        items: {
                            $ref: "#/components/schemas/AssociatedWorkflowModel",
                        },
                    },
                },
                required: [
                    "bookingMode",
                    "busyIntervals",
                    "duration",
                    "enabled",
                    "fullSlug",
                    "hosts",
                    "i18n",
                    "id",
                    "name",
                    "notifications",
                    "questions",
                    "slug",
                    "step",
                    "tags",
                    "thirdPartyCalendars",
                    "userId",
                    "workflows",
                ],
            },
            EventTypeAvailabilityModel: {
                type: "object",
                properties: {
                    availableUnits: {
                        type: "integer",
                        format: "int32",
                    },
                    description: {
                        type: "string",
                    },
                    eventTypeTags: {
                        type: "object",
                        additionalProperties: {
                            type: "string",
                        },
                    },
                    eventTypeTimeZone: {
                        type: "string",
                    },
                    i18n: {
                        $ref: "#/components/schemas/PublicEventTypeI18n",
                    },
                    id: {
                        type: "string",
                        format: "uuid",
                    },
                    imageUrl: {
                        type: "string",
                        format: "uri",
                    },
                    maxConcurrentBookings: {
                        type: "integer",
                        format: "int32",
                    },
                    maxUnitsPerBooking: {
                        type: "integer",
                        format: "int32",
                    },
                    name: {
                        type: "string",
                    },
                    questions: {
                        type: "array",
                        items: {
                            oneOf: [
                                {
                                    $ref: "#/components/schemas/EmailQuestion",
                                },
                                {
                                    $ref: "#/components/schemas/ImageQuestion",
                                },
                                {
                                    $ref: "#/components/schemas/LocationQuestion",
                                },
                                {
                                    $ref: "#/components/schemas/PasswordQuestion",
                                },
                                {
                                    $ref: "#/components/schemas/PhoneQuestion",
                                },
                                {
                                    $ref: "#/components/schemas/TextQuestion",
                                },
                            ],
                        },
                    },
                    redirectAfterBooking: {
                        $ref: "#/components/schemas/AfterBookingRedirect",
                    },
                    timeSlots: {
                        type: "array",
                        items: {
                            $ref: "#/components/schemas/EvaluatedTimeSlotModel",
                        },
                    },
                    unitsLabel: {
                        type: "string",
                    },
                },
                required: [
                    "eventTypeTags",
                    "i18n",
                    "id",
                    "name",
                    "questions",
                    "timeSlots",
                ],
            },
            EventTypeHostCalendarModel: {
                type: "object",
                properties: {
                    account: {
                        type: "string",
                    },
                    description: {
                        type: "string",
                    },
                    id: {
                        type: "string",
                    },
                    name: {
                        type: "string",
                    },
                    primary: {
                        type: "boolean",
                    },
                    provider: {
                        type: "string",
                    },
                    readOnly: {
                        type: "boolean",
                    },
                    syncBookings: {
                        type: "boolean",
                    },
                    verifyAvailability: {
                        type: "boolean",
                    },
                },
                required: [
                    "account",
                    "id",
                    "name",
                    "primary",
                    "provider",
                    "readOnly",
                    "syncBookings",
                    "verifyAvailability",
                ],
            },
            EventTypeHostModel: {
                type: "object",
                properties: {
                    calendars: {
                        type: "array",
                        items: {
                            $ref: "#/components/schemas/EventTypeHostCalendarModel",
                        },
                        uniqueItems: true,
                    },
                    email: {
                        type: "string",
                    },
                    id: {
                        type: "string",
                        format: "uuid",
                    },
                    role: {
                        type: "string",
                        enum: ["OWNER", "COLLABORATOR"],
                    },
                },
                required: ["calendars", "email", "id", "role"],
            },
            EventTypeI18nConfig: {
                type: "object",
                properties: {
                    description: {
                        type: "object",
                        additionalProperties: {
                            type: "string",
                        },
                    },
                    name: {
                        type: "object",
                        additionalProperties: {
                            type: "string",
                        },
                    },
                    questions: {
                        type: "object",
                        additionalProperties: {
                            $ref: "#/components/schemas/QuestionI18nConfig",
                        },
                        description: "Map of questions i18n config by question id.",
                    },
                },
            },
            EventTypeListItem: {
                type: "object",
                properties: {
                    description: {
                        type: "string",
                    },
                    fullSlug: {
                        type: "string",
                    },
                    id: {
                        type: "string",
                        format: "uuid",
                    },
                    name: {
                        type: "string",
                    },
                    slug: {
                        type: "string",
                    },
                    userId: {
                        type: "string",
                        format: "uuid",
                    },
                },
                required: ["fullSlug", "id", "name", "slug", "userId"],
            },
            EventTypeQuestion: {
                type: "object",
                discriminator: {
                    propertyName: "type",
                },
                properties: {
                    canBeDeleted: {
                        type: "boolean",
                    },
                    id: {
                        type: "string",
                    },
                    label: {
                        type: "string",
                    },
                    required: {
                        type: "boolean",
                    },
                    type: {
                        type: "string",
                    },
                },
                required: ["id", "label", "type"],
            },
            EventTypesListBody: {
                type: "object",
                properties: {
                    eventTypes: {
                        type: "array",
                        items: {
                            $ref: "#/components/schemas/EventTypeListItem",
                        },
                    },
                },
                required: ["eventTypes"],
            },
            ExternalBooking: {
                type: "object",
                properties: {
                    answers: {
                        type: "object",
                        additionalProperties: {
                            type: "string",
                        },
                    },
                    bookerEmail: {
                        type: "string",
                    },
                    confirmedAt: {
                        type: "string",
                        format: "date-time",
                    },
                    eventTypeId: {
                        type: "string",
                        format: "uuid",
                    },
                    interval: {
                        $ref: "#/components/schemas/InstantInterval",
                    },
                    notes: {
                        type: "string",
                        maxLength: 2048,
                        minLength: 0,
                    },
                    price: {
                        $ref: "#/components/schemas/MonetaryAmount",
                    },
                    resources: {
                        type: "array",
                        items: {
                            $ref: "#/components/schemas/UsedBookingResource",
                        },
                        uniqueItems: true,
                    },
                    units: {
                        type: "integer",
                        format: "int32",
                        minimum: 1,
                    },
                },
                required: ["eventTypeId", "interval"],
            },
            ExternalBookingAnsweredQuestionModel: {
                type: "object",
                properties: {
                    answer: {
                        type: "string",
                    },
                    id: {
                        type: "string",
                    },
                },
                required: ["id"],
            },
            ExternalBookingEventTypeModel: {
                type: "object",
                properties: {
                    id: {
                        type: "string",
                        format: "uuid",
                    },
                    tags: {
                        type: "object",
                        additionalProperties: {
                            type: "string",
                        },
                    },
                },
                required: ["id", "tags"],
            },
            ExternalBookingEventTypeOwnerModel: {
                type: "object",
                properties: {
                    id: {
                        type: "string",
                        format: "uuid",
                    },
                    tags: {
                        type: "object",
                        additionalProperties: {
                            type: "string",
                        },
                    },
                },
                required: ["id", "tags"],
            },
            ExternalBookingValidationModel: {
                type: "object",
                properties: {
                    answeredQuestions: {
                        type: "array",
                        items: {
                            $ref: "#/components/schemas/ExternalBookingAnsweredQuestionModel",
                        },
                    },
                    eventType: {
                        $ref: "#/components/schemas/ExternalBookingEventTypeModel",
                    },
                    eventTypeOwner: {
                        $ref: "#/components/schemas/ExternalBookingEventTypeOwnerModel",
                    },
                    id: {
                        type: "string",
                        format: "uuid",
                    },
                    interval: {
                        $ref: "#/components/schemas/InstantInterval",
                    },
                    units: {
                        type: "integer",
                        format: "int32",
                        description: "Booked units.",
                    },
                },
                required: [
                    "answeredQuestions",
                    "eventType",
                    "eventTypeOwner",
                    "id",
                    "interval",
                ],
            },
            FixedLocation: {
                allOf: [
                    {
                        $ref: "#/components/schemas/LocationModel",
                    },
                    {
                        type: ["object"],
                        example: null,
                        properties: {
                            freeText: {
                                type: "string",
                            },
                        },
                    },
                ],
                required: ["freeText"],
            },
            FixedLocationOption: {
                allOf: [
                    {
                        $ref: "#/components/schemas/LocationOptionModel",
                    },
                    {
                        type: ["object"],
                        example: null,
                        properties: {
                            location: {
                                type: "string",
                                description: "The free location string. It'll be used in communications such as SMS reminders, emails...",
                            },
                        },
                    },
                ],
            },
            FixedPriceSpecification: {
                allOf: [
                    {
                        $ref: "#/components/schemas/PriceSpecification",
                    },
                    {
                        type: ["object"],
                        example: null,
                        properties: {
                            amount: {
                                type: "string",
                                description: "Amount expressed in an string to avoid precisions loses.",
                                examples: ["12.45", "20"],
                            },
                        },
                    },
                ],
                required: ["amount"],
            },
            FuzzyCalendarEventInvitationInterval: {
                allOf: [
                    {
                        $ref: "#/components/schemas/CalendarEventInvitationEvent",
                    },
                    {
                        type: ["object"],
                        example: null,
                        properties: {
                            date: {
                                type: "string",
                                format: "date",
                                description: "The date of the invitation, ISO 8601 format, YYYY-MM-DD",
                            },
                            fuzzyTime: {
                                type: "string",
                                description: "The fuzzy time for the invitation.\n * `MORNING` - From 08:00 to 12:00.\n * `AFTERNOON` - From 12:00 to 16:00.\n * `EVENING` - From 16:00 to 20:00.\n * `NIGHT` - From 20:00 onwards.\n",
                                enum: ["MORNING", "AFTERNOON", "EVENING", "NIGHT"],
                            },
                            timeZone: {
                                type: "string",
                                description: 'The time zone in which the time is specified. (Formatted as an IANA Time Zone Database name, e.g. "Europe/Zurich".)',
                                example: "Europe/Madrid",
                            },
                        },
                    },
                ],
                required: ["date", "fuzzyTime", "timeZone"],
            },
            GetPublicEventTypeModel: {
                type: "object",
                properties: {
                    availableUnits: {
                        type: "integer",
                        format: "int32",
                    },
                    description: {
                        type: "string",
                    },
                    eventTypeTags: {
                        type: "object",
                        additionalProperties: {
                            type: "string",
                        },
                    },
                    eventTypeTimeZone: {
                        type: "string",
                    },
                    i18n: {
                        $ref: "#/components/schemas/PublicEventTypeI18n",
                    },
                    id: {
                        type: "string",
                        format: "uuid",
                    },
                    imageUrl: {
                        type: "string",
                        format: "uri",
                    },
                    maxConcurrentBookings: {
                        type: "integer",
                        format: "int32",
                    },
                    maxUnitsPerBooking: {
                        type: "integer",
                        format: "int32",
                    },
                    name: {
                        type: "string",
                    },
                    questions: {
                        type: "array",
                        items: {
                            oneOf: [
                                {
                                    $ref: "#/components/schemas/EmailQuestion",
                                },
                                {
                                    $ref: "#/components/schemas/ImageQuestion",
                                },
                                {
                                    $ref: "#/components/schemas/LocationQuestion",
                                },
                                {
                                    $ref: "#/components/schemas/PasswordQuestion",
                                },
                                {
                                    $ref: "#/components/schemas/PhoneQuestion",
                                },
                                {
                                    $ref: "#/components/schemas/TextQuestion",
                                },
                            ],
                        },
                    },
                    redirectAfterBooking: {
                        $ref: "#/components/schemas/AfterBookingRedirect",
                    },
                    unitsLabel: {
                        type: "string",
                    },
                },
                required: ["eventTypeTags", "i18n", "id", "name", "questions"],
            },
            GoogleCalendarCreateMeetBehavior: {
                type: "object",
                properties: {
                    mode: {
                        type: "string",
                        description: "Configures whether TimeTime will request google a new google meet link or not. \n * `ALWAYS` - Always creates a new google meet link.\n * `ONLY_IF_ONLINE_LOCATION_IS_NEEDED` - It will only add a new google meet link if the event type has the location configured to Google Meet. **Default**.\n * `NEVER` - Never creates a google meet link.\n\nNote that some emails might still be sent by google regardless of this configuration. ",
                        enum: ["ALWAYS", "ONLY_IF_ONLINE_LOCATION_IS_NEEDED", "NEVER"],
                    },
                    reuseOnlineConferenceIfPresent: {
                        type: "boolean",
                        description: "When true, it will only add a new google meet link if no other workflow  has created an online conference yet.",
                    },
                },
            },
            GoogleCalendarEventBookingNotification: {
                allOf: [
                    {
                        $ref: "#/components/schemas/AfterConfirmingBookingWorkflowAction",
                    },
                    {
                        type: ["object"],
                        example: null,
                        properties: {
                            addAttendees: {
                                type: "boolean",
                                description: "Whether to add the attendees to the calendar or not. If they are added, they might get notifications, based on the `guestNotificationsMode` field.",
                            },
                            addOrganizerAsAttendee: {
                                type: "boolean",
                                description: "Whether to add the organizer (the owner of the calendar) as an attendee or not. Not adding it is useful when the organizer sets up meetings for other people. ",
                            },
                            calendarId: {
                                type: "string",
                                description: "The google calendar id in which events will be inserted. The id is not the raw google calendar id but the timetime version of it. It can be fetched with the user info.",
                            },
                            colorId: {
                                type: "string",
                            },
                            createGoogleMeetBehavior: {
                                $ref: "#/components/schemas/GoogleCalendarCreateMeetBehavior",
                            },
                            extraEmailAttendees: {
                                type: "array",
                                description: "A fixed list of additional attendees that must be always added to the event.",
                                items: {
                                    type: "string",
                                },
                                uniqueItems: true,
                            },
                            guestNotificationsMode: {
                                type: "string",
                                description: "Configures how google will behave, how they will send notifications about the creation of the new event. \n * `ALL` - Notifications are sent to all guests\n * `EXTERNAL_ONLY` - Notifications are sent to non-Google Calendar guests only\n * `NONE` - No notifications are sent \n\nNote that some emails might still be sent by google regardless of this configuration. ",
                                enum: ["ALL", "EXTERNAL_ONLY", "NONE"],
                            },
                            guestsCanSeeOtherGuests: {
                                type: "boolean",
                                description: "Whether attendees other than the organizer can see who the event's attendees are.",
                            },
                            overlapMode: {
                                type: "string",
                                description: "Defines how TimeTime will behave when a google calendar event is already in place for the same TimeTime resource or event type. An overlap is possible if maxConcurrentBookings has been set to number higher than 1 or if the event type is not configured to check the availability in the target calendar.\n * `NEW_EVENT` - A new event will be inserted without taking in consideration what's in the calendar.\n * `UPDATE_ATTENDEES` - The previous inserted event is reused, and TimeTime will sync the attendees accordingly",
                                enum: ["NEW_EVENT", "UPDATE_ATTENDEES"],
                            },
                        },
                    },
                ],
                required: ["calendarId", "overlapMode"],
            },
            GoogleCalendarOutOfOfficeBookingNotification: {
                allOf: [
                    {
                        $ref: "#/components/schemas/AfterConfirmingBookingWorkflowAction",
                    },
                    {
                        type: ["object"],
                        example: null,
                        properties: {
                            calendarId: {
                                type: "string",
                                description: "The google calendar id in which the OOO will be inserted. The id is not the raw google calendar id but the timetime version of it. It can be fetched with the user info.",
                            },
                        },
                    },
                ],
                required: ["calendarId"],
            },
            GoogleConsentBody: {
                type: "object",
                properties: {
                    authCode: {
                        type: "string",
                    },
                    redirectUri: {
                        type: "string",
                        format: "uri",
                    },
                },
                required: ["authCode"],
            },
            GoogleMeetLocation: {
                allOf: [
                    {
                        $ref: "#/components/schemas/LocationModel",
                    },
                ],
            },
            GoogleMeetLocationOption: {
                allOf: [
                    {
                        $ref: "#/components/schemas/LocationOptionModel",
                    },
                ],
            },
            HoldBookingMode: {
                allOf: [
                    {
                        $ref: "#/components/schemas/BookingMode",
                    },
                    {
                        type: ["object"],
                        example: null,
                        properties: {
                            timeout: {
                                type: "string",
                                format: "duration",
                                description: "The timeout for the hold. If the timeout is reached without confirming the hold, the booking will be automatically canceled.",
                            },
                        },
                    },
                ],
                description: "Hold booking mode.\nOnce the booking is on hold, all the associated resources are marked busy.\n\nTo confirm a hold, an API call needs to be made. The HoldBookingMode is intended to be used by\nenterprise TimeTime clients integrated with the API.\n\nUsing Hold mode, enable partners to for example, process payments, and only confirm the hold if\nthe payment has been completed successfully.",
                required: ["timeout"],
            },
            ImageQuestion: {
                allOf: [
                    {
                        $ref: "#/components/schemas/EventTypeQuestion",
                    },
                    {
                        type: ["object"],
                        example: null,
                        properties: {
                            canBeDeleted: {
                                type: "boolean",
                                readOnly: true,
                            },
                        },
                    },
                ],
                required: ["id", "label"],
            },
            InstantBookingMode: {
                allOf: [
                    {
                        $ref: "#/components/schemas/BookingMode",
                    },
                ],
                description: "The booking is confirmed immediately.",
            },
            InstantInterval: {
                type: "object",
                properties: {
                    end: {
                        type: "string",
                        format: "date-time",
                    },
                    start: {
                        type: "string",
                        format: "date-time",
                    },
                },
                required: ["end", "start"],
            },
            InviteOrganizationMember: {
                type: "object",
                properties: {
                    email: {
                        type: "string",
                    },
                    roles: {
                        type: "array",
                        items: {
                            type: "string",
                            enum: ["MEMBER", "ADMIN"],
                        },
                        uniqueItems: true,
                    },
                },
                required: ["email", "roles"],
            },
            LinkedPricingPolicy: {
                type: "object",
                description: "The pricing policy linked with this resource.\nIt contains a very minimum representation of the entire pricing policy.\nIf more details are needed, fetch the pricing policy via the related GET endpoint.",
                properties: {
                    id: {
                        type: "string",
                        format: "uuid",
                        description: "The pricing policy id",
                    },
                    name: {
                        type: "string",
                        description: "The pricing policy name",
                    },
                },
                required: ["id", "name"],
            },
            ListUsersResponse: {
                type: "object",
                properties: {
                    users: {
                        type: "array",
                        items: {
                            $ref: "#/components/schemas/User",
                        },
                    },
                },
                required: ["users"],
            },
            LocationModel: {
                type: "object",
                discriminator: {
                    propertyName: "type",
                },
                properties: {
                    type: {
                        type: "string",
                    },
                },
                required: ["type"],
            },
            LocationOptionModel: {
                type: "object",
                discriminator: {
                    propertyName: "type",
                },
                properties: {
                    type: {
                        type: "string",
                    },
                },
                required: ["type"],
            },
            LocationQuestion: {
                allOf: [
                    {
                        $ref: "#/components/schemas/EventTypeQuestion",
                    },
                    {
                        type: ["object"],
                        example: null,
                        properties: {
                            allowedOptions: {
                                type: "array",
                                items: {
                                    oneOf: [
                                        {
                                            $ref: "#/components/schemas/BookerPhoneOption",
                                        },
                                        {
                                            $ref: "#/components/schemas/FixedLocationOption",
                                        },
                                        {
                                            $ref: "#/components/schemas/GoogleMeetLocationOption",
                                        },
                                        {
                                            $ref: "#/components/schemas/MicrosoftOutlookOption",
                                        },
                                    ],
                                },
                                uniqueItems: true,
                            },
                            canBeDeleted: {
                                type: "boolean",
                                readOnly: true,
                            },
                        },
                    },
                ],
                required: ["allowedOptions", "id", "label"],
            },
            LoginToken: {
                type: "object",
                properties: {
                    token: {
                        type: "string",
                        description: "The temporary token that can be used for login the user.",
                    },
                },
                required: ["token"],
            },
            MaxBookingsPerTimeUnit: {
                type: "object",
                properties: {
                    perDay: {
                        type: "integer",
                        format: "int32",
                        description: "Max bookings allowed per natural day. The start of the day is calculated considering the event & user's timezone.",
                        minimum: 1,
                    },
                    perHour: {
                        type: "integer",
                        format: "int32",
                        description: "Max bookings allowed per natural hour.",
                        minimum: 1,
                    },
                    perMonth: {
                        type: "integer",
                        format: "int32",
                        description: "Max bookings per natural month. The the starting hour for the first day of the month is calculated considering the event & user's timezone.",
                        minimum: 1,
                    },
                    perWeek: {
                        type: "integer",
                        format: "int32",
                        description: "Max bookings per natural week. Starting on Monday, and the the starting hour is calculated considering the event & user's timezone.",
                        minimum: 1,
                    },
                },
            },
            MicrosoftOutlookLocation: {
                allOf: [
                    {
                        $ref: "#/components/schemas/LocationModel",
                    },
                ],
            },
            MicrosoftOutlookOption: {
                allOf: [
                    {
                        $ref: "#/components/schemas/LocationOptionModel",
                    },
                ],
            },
            MonetaryAmount: {
                type: "object",
                properties: {
                    amount: {
                        type: "string",
                        description: "Amount expressed in an string to avoid precisions loses.",
                        example: 12.45,
                        examples: ["12.45", "20"],
                    },
                    currency: {
                        type: "string",
                        description: "ISO 4217 Currency code",
                        example: "EUR",
                        examples: ["EUR", "USD"],
                    },
                },
                required: ["amount", "currency"],
            },
            Organization: {
                type: "object",
                properties: {
                    domain: {
                        type: "string",
                    },
                    id: {
                        type: "string",
                        format: "uuid",
                    },
                    image: {
                        type: "string",
                        format: "uri",
                    },
                    name: {
                        type: "string",
                    },
                    tags: {
                        type: "object",
                        additionalProperties: {
                            type: "string",
                        },
                    },
                    webhooks: {
                        type: "array",
                        items: {
                            $ref: "#/components/schemas/WebhookDeliveryConfig",
                        },
                        uniqueItems: true,
                    },
                },
                required: ["id", "name", "tags", "webhooks"],
            },
            OrganizationMember: {
                type: "object",
                properties: {
                    email: {
                        type: "string",
                    },
                    id: {
                        type: "string",
                        format: "uuid",
                    },
                    roles: {
                        type: "array",
                        items: {
                            type: "string",
                            enum: ["MEMBER", "ADMIN"],
                        },
                        uniqueItems: true,
                    },
                },
                required: ["email", "id", "roles"],
            },
            OrganizationMembersList: {
                type: "object",
                properties: {
                    members: {
                        type: "array",
                        items: {
                            $ref: "#/components/schemas/OrganizationMember",
                        },
                    },
                },
                required: ["members"],
            },
            OrganizationMembership: {
                type: "object",
                properties: {
                    organizationId: {
                        type: "string",
                        format: "uuid",
                    },
                    roles: {
                        type: "array",
                        items: {
                            type: "string",
                            enum: ["MEMBER", "ADMIN"],
                        },
                        uniqueItems: true,
                    },
                },
                required: ["organizationId", "roles"],
            },
            OrganizationResourceCollaborator: {
                allOf: [
                    {
                        $ref: "#/components/schemas/ResourceCollaborator",
                    },
                    {
                        type: ["object"],
                        example: null,
                        properties: {
                            organizationId: {
                                type: "string",
                                format: "uuid",
                            },
                        },
                    },
                ],
                description: "Making an 'organization' collaborator of a resource means that members of that org can see the resource and use it for configuring their services. Example: including the resource for a round robbin availability.As of now, there is no strict control of what members of the org can do, all of them will see the resource and they will be able to link it to their services. Modifying/Deleting the resource won't be allowed for them.",
                required: ["organizationId"],
            },
            OrganizationsList: {
                type: "object",
                properties: {
                    organizations: {
                        type: "array",
                        items: {
                            $ref: "#/components/schemas/Organization",
                        },
                    },
                },
                required: ["organizations"],
            },
            PasswordQuestion: {
                allOf: [
                    {
                        $ref: "#/components/schemas/EventTypeQuestion",
                    },
                    {
                        type: ["object"],
                        example: null,
                        properties: {
                            canBeDeleted: {
                                type: "boolean",
                                readOnly: true,
                            },
                        },
                    },
                ],
                required: ["id", "label"],
            },
            PatchBookingBody: {
                type: "object",
                properties: {
                    privateNotes: {
                        type: "array",
                        items: {
                            type: "string",
                        },
                        uniqueItems: true,
                    },
                },
                required: ["privateNotes"],
            },
            PatchOrganizationMembership: {
                type: "object",
                properties: {
                    roles: {
                        type: "array",
                        items: {
                            type: "string",
                            enum: ["MEMBER", "ADMIN"],
                        },
                        uniqueItems: true,
                    },
                },
                required: ["roles"],
            },
            PatchTenantMembershipModel: {
                type: "object",
                properties: {
                    role: {
                        type: "string",
                        enum: ["MEMBER", "ADMIN"],
                    },
                },
                required: ["role"],
            },
            PatchTenantRequest: {
                type: "object",
                properties: {
                    name: {
                        type: "string",
                        description: "Name of the tenant",
                    },
                    webAppConfig: {
                        type: "object",
                        additionalProperties: {},
                        description: "Free form JSON object for the web app config.",
                    },
                    webhooks: {
                        type: "array",
                        description: "Global webhooks for the tenant.",
                        items: {
                            $ref: "#/components/schemas/WebhookDeliveryConfig",
                        },
                        uniqueItems: true,
                    },
                },
            },
            PatchUserModel: {
                type: "object",
                properties: {
                    tenant: {
                        $ref: "#/components/schemas/PatchTenantMembershipModel",
                    },
                },
                required: ["tenant"],
            },
            PhoneQuestion: {
                allOf: [
                    {
                        $ref: "#/components/schemas/EventTypeQuestion",
                    },
                    {
                        type: ["object"],
                        example: null,
                        properties: {
                            canBeDeleted: {
                                type: "boolean",
                                readOnly: true,
                            },
                        },
                    },
                ],
                required: ["id", "label"],
            },
            PostUserBody: {
                type: "object",
                properties: {
                    email: {
                        type: "string",
                    },
                    externalId: {
                        type: "string",
                        description: "Id on an external system. Typically the user id on the tenant service side.",
                    },
                },
                required: ["email"],
            },
            PriceSpecification: {
                type: "object",
                discriminator: {
                    propertyName: "type",
                },
                properties: {
                    type: {
                        type: "string",
                    },
                },
                required: ["type"],
            },
            PricingPolicesList: {
                type: "object",
                properties: {
                    items: {
                        type: "array",
                        items: {
                            $ref: "#/components/schemas/PricingPolicy",
                        },
                    },
                },
                required: ["items"],
            },
            PricingPolicy: {
                type: "object",
                properties: {
                    currency: {
                        type: "string",
                        description: "ISO 4217 Currency code",
                        example: "EUR",
                        examples: ["EUR", "USD"],
                    },
                    id: {
                        type: "string",
                        format: "uuid",
                        description: "Id of the pricing policy",
                    },
                    name: {
                        type: "string",
                        description: "Name of the pricing policy",
                    },
                    overrides: {
                        type: "array",
                        items: {
                            $ref: "#/components/schemas/PricingPolicyOverride",
                        },
                    },
                    owner: {
                        oneOf: [
                            {
                                $ref: "#/components/schemas/PricingPolicyOwnerOrg",
                            },
                            {
                                $ref: "#/components/schemas/PricingPolicyOwnerUser",
                            },
                        ],
                    },
                    priceSpecification: {
                        description: "Default price specification",
                        oneOf: [
                            {
                                $ref: "#/components/schemas/FixedPriceSpecification",
                            },
                            {
                                $ref: "#/components/schemas/TieredPriceSpecification",
                            },
                        ],
                    },
                    tags: {
                        type: "object",
                        additionalProperties: {
                            type: "string",
                        },
                        description: "Arbitrary key/value collection. Useful for API users to store metadata.",
                    },
                },
                required: [
                    "currency",
                    "id",
                    "name",
                    "overrides",
                    "owner",
                    "priceSpecification",
                ],
            },
            PricingPolicyId: {
                type: "object",
                properties: {
                    id: {
                        type: "string",
                        format: "uuid",
                        description: "The pricing policy id",
                    },
                },
                required: ["id"],
            },
            PricingPolicyOverride: {
                type: "object",
                properties: {
                    name: {
                        type: "string",
                    },
                    priceSpecification: {
                        oneOf: [
                            {
                                $ref: "#/components/schemas/FixedPriceSpecification",
                            },
                            {
                                $ref: "#/components/schemas/TieredPriceSpecification",
                            },
                        ],
                    },
                    rules: {
                        $ref: "#/components/schemas/PricingPolicyOverrideRules",
                    },
                    tags: {
                        type: "object",
                        additionalProperties: {
                            type: "string",
                        },
                        description: "Arbitrary key/value collection. Useful for API users to store metadata.",
                    },
                },
                required: ["name", "priceSpecification", "rules"],
            },
            PricingPolicyOverrideRules: {
                type: "object",
                properties: {
                    schedule: {
                        type: "string",
                        description: '\nAn RFC-5545 calendar to specify when this override matches.\n\nWhen modeling price specifications, it\'s usual to see some kind of restrictions/exceptions stamped in the form\nof "validFrom" and "validUntil". But those are not enough to model some of the real world price specs such as\n\n* This price applies every week day from 7pm till 9pm"\n* This price applies every New Year\'s Eve\n\nSo, for that, in TimeTime we decided to use the standard to communicate those complex rules, and the existing\nRFC-5545 ICS covers all these cases.\n\nWe\'ll use that to calculate a price, if there is an event (or an instance of a recurring event) happening in\nthe evaluated time interval, the override price will be applied.\n        ',
                    },
                },
                required: ["schedule"],
            },
            PricingPolicyOwner: {
                type: "object",
                description: "Price policy owner",
                discriminator: {
                    mapping: {
                        PricingPolicyOwnerOrg: "#/components/schemas/PricingPolicyOwnerOrg",
                        PricingPolicyOwnerUser: "#/components/schemas/PricingPolicyOwnerUser",
                    },
                    propertyName: "type",
                },
                properties: {
                    type: {
                        type: "string",
                    },
                },
                required: ["type"],
            },
            PricingPolicyOwnerOrg: {
                allOf: [
                    {
                        $ref: "#/components/schemas/PricingPolicyOwner",
                    },
                    {
                        type: ["object"],
                        example: null,
                        properties: {
                            id: {
                                type: "string",
                                format: "uuid",
                            },
                        },
                    },
                ],
                description: "Org pricing policy owner",
                required: ["id"],
            },
            PricingPolicyOwnerUser: {
                allOf: [
                    {
                        $ref: "#/components/schemas/PricingPolicyOwner",
                    },
                    {
                        type: ["object"],
                        example: null,
                        properties: {
                            id: {
                                type: "string",
                                format: "uuid",
                            },
                        },
                    },
                ],
                description: "User pricing policy owner",
                required: ["id"],
            },
            ProblemDetail: {
                type: "object",
                properties: {
                    detail: {
                        type: "string",
                    },
                    instance: {
                        type: "string",
                        format: "uri",
                    },
                    properties: {
                        type: "object",
                        additionalProperties: {},
                    },
                    status: {
                        type: "integer",
                        format: "int32",
                    },
                    title: {
                        type: "string",
                    },
                    type: {
                        type: "string",
                        format: "uri",
                    },
                },
            },
            PublicBooking: {
                type: "object",
                properties: {
                    answeredQuestions: {
                        type: "array",
                        items: {
                            $ref: "#/components/schemas/AnsweredQuestionModel",
                        },
                    },
                    bookedResources: {
                        type: "array",
                        items: {
                            $ref: "#/components/schemas/BookedResource",
                        },
                        uniqueItems: true,
                    },
                    booker: {
                        $ref: "#/components/schemas/BookerModel",
                    },
                    cancellation: {
                        $ref: "#/components/schemas/BookingCancellationModel",
                        description: "Not null if the booking has been cancelled.",
                    },
                    conferenceLink: {
                        type: "string",
                        format: "uri",
                    },
                    confirmedAt: {
                        type: "string",
                        format: "date-time",
                    },
                    eventType: {
                        $ref: "#/components/schemas/BookedEventType",
                    },
                    heldUntil: {
                        type: "string",
                        format: "date-time",
                    },
                    id: {
                        type: "string",
                        format: "uuid",
                    },
                    interval: {
                        $ref: "#/components/schemas/InstantInterval",
                    },
                    notes: {
                        type: "string",
                        description: "Additional notes added by the booker when submitting the booking.",
                    },
                    price: {
                        $ref: "#/components/schemas/MonetaryAmount",
                    },
                    privateNotes: {
                        type: "array",
                        items: {
                            type: "string",
                        },
                        uniqueItems: true,
                    },
                    status: {
                        type: "string",
                        description: "Booking status.\n * `CONFIRMED` - Booking is confirmed.\n * `ON_HOLD` - Booking is on hold, this means the slot and the related resources are blocked till the hold is released.\n * `CANCELED` - Booking has been canceled.",
                        enum: ["CONFIRMED", "ON_HOLD", "CANCELED"],
                    },
                    units: {
                        type: "integer",
                        format: "int32",
                        description: "Booked units.",
                    },
                },
                required: [
                    "answeredQuestions",
                    "bookedResources",
                    "booker",
                    "eventType",
                    "id",
                    "interval",
                    "privateNotes",
                    "status",
                ],
            },
            PublicEventTypeI18n: {
                type: "object",
                properties: {
                    availableLocales: {
                        type: "array",
                        items: {
                            type: "string",
                            format: "locale",
                        },
                        uniqueItems: true,
                    },
                    currentLocale: {
                        type: "string",
                        format: "locale",
                    },
                },
                required: ["availableLocales"],
            },
            PublicInvitedAttendee: {
                type: "object",
                properties: {
                    comment: {
                        type: "string",
                        description: "The response comment",
                    },
                    status: {
                        type: "string",
                        description: "Represents the status of the attendee response.",
                        enum: ["NEEDS_ACTION", "DECLINED", "TENTATIVE", "ACCEPTED"],
                    },
                },
                required: ["status"],
            },
            PublicProfile: {
                type: "object",
                properties: {
                    description: {
                        type: "string",
                    },
                    id: {
                        type: "string",
                        format: "uuid",
                    },
                    imageUrl: {
                        type: "string",
                        format: "uri",
                    },
                    links: {
                        type: "array",
                        items: {
                            $ref: "#/components/schemas/PublicProfileLink",
                        },
                    },
                    name: {
                        type: "string",
                    },
                    slug: {
                        type: "string",
                    },
                    tags: {
                        type: "object",
                        additionalProperties: {
                            type: "string",
                        },
                    },
                },
                required: ["id", "name", "slug"],
            },
            PublicProfileLink: {
                type: "object",
                properties: {
                    description: {
                        type: "string",
                        maxLength: 4096,
                        minLength: 0,
                    },
                    imageUrl: {
                        type: "string",
                        format: "uri",
                    },
                    link: {
                        type: "string",
                        format: "uri",
                    },
                    name: {
                        type: "string",
                        maxLength: 256,
                        minLength: 0,
                    },
                    tags: {
                        type: "object",
                        additionalProperties: {
                            type: "string",
                        },
                    },
                },
                required: ["link", "name"],
            },
            PublicProfileWriteModel: {
                type: "object",
                properties: {
                    description: {
                        type: "string",
                        maxLength: 4096,
                        minLength: 0,
                    },
                    imageUrl: {
                        type: "string",
                        format: "uri",
                    },
                    links: {
                        type: "array",
                        items: {
                            $ref: "#/components/schemas/PublicProfileLink",
                        },
                        maxItems: 256,
                        minItems: 0,
                    },
                    name: {
                        type: "string",
                        maxLength: 256,
                        minLength: 1,
                    },
                    slug: {
                        type: "string",
                        maxLength: 64,
                        minLength: 1,
                        pattern: "^[a-zà-ú0-9\\uD83C-\\uDBFF\\uDC00-\\uDFFF]+(?:-[a-zà-ú0-9\\uD83C-\\uDBFF\\uDC00-\\uDFFF]+)*$",
                    },
                    tags: {
                        type: "object",
                        additionalProperties: {
                            type: "string",
                        },
                    },
                },
                required: ["name", "slug"],
            },
            PublicProfilesList: {
                type: "object",
                properties: {
                    publicProfiles: {
                        type: "array",
                        items: {
                            $ref: "#/components/schemas/PublicProfile",
                        },
                    },
                },
                required: ["publicProfiles"],
            },
            PublicTenant: {
                type: "object",
                properties: {
                    domain: {
                        type: "string",
                        description: "Domain of the tenant.",
                    },
                    id: {
                        type: "string",
                        description: "Id of the tenant",
                    },
                    name: {
                        type: "string",
                        description: "Name of the tenant",
                    },
                    webAppConfig: {
                        type: "object",
                        additionalProperties: {},
                        description: "Free form JSON object for the web app config.",
                    },
                },
                required: ["id", "name", "webAppConfig"],
            },
            PutAfterConfirmingBookingWorkflowRequest: {
                allOf: [
                    {
                        $ref: "#/components/schemas/PutWorkflowRequest",
                    },
                    {
                        type: ["object"],
                        example: null,
                        properties: {
                            actions: {
                                type: "array",
                                items: {
                                    oneOf: [
                                        {
                                            $ref: "#/components/schemas/GoogleCalendarEventBookingNotification",
                                        },
                                        {
                                            $ref: "#/components/schemas/GoogleCalendarOutOfOfficeBookingNotification",
                                        },
                                    ],
                                },
                            },
                            name: {
                                type: "string",
                            },
                            owner: {
                                oneOf: [
                                    {
                                        $ref: "#/components/schemas/WorkflowOwnerOrg",
                                    },
                                    {
                                        $ref: "#/components/schemas/WorkflowOwnerUser",
                                    },
                                ],
                            },
                            tags: {
                                type: "object",
                                additionalProperties: {
                                    type: "string",
                                },
                            },
                            trigger: {
                                $ref: "#/components/schemas/AfterConfirmingBookingTrigger",
                            },
                        },
                    },
                ],
                required: ["name", "owner", "trigger"],
            },
            PutCalendar: {
                type: "object",
                properties: {
                    defaultTimeZone: {
                        type: "string",
                    },
                    description: {
                        type: "string",
                        maxLength: 1024,
                        minLength: 0,
                    },
                    name: {
                        type: "string",
                        maxLength: 256,
                        minLength: 0,
                    },
                    owner: {
                        oneOf: [
                            {
                                $ref: "#/components/schemas/CalendarOwnerOrg",
                            },
                            {
                                $ref: "#/components/schemas/CalendarOwnerUser",
                            },
                        ],
                    },
                    tags: {
                        type: "object",
                        additionalProperties: {
                            type: "string",
                        },
                        description: "Arbitrary key/value collection. Useful for API users to store metadata.",
                    },
                },
                required: ["name"],
            },
            PutCalendarEventAttendeeInvitationRequest: {
                type: "object",
                properties: {
                    description: {
                        type: "string",
                        maxLength: 65536,
                        minLength: 0,
                    },
                    displayTimeMode: {
                        type: "string",
                        description: "Configures how TimeTime will show the invitation event time.\n * `EXACT` - It'll show the exact start/end time of the event.\n * `FUZZY` - It'll show a fuzzy version of the event time, like 'MORNING', 'AFTERNOON'... * `START_DATE` - It'll show the starting date day, without time (hours, minutes...) information.",
                        enum: ["EXACT", "FUZZY", "START_DATE"],
                    },
                    id: {
                        type: "string",
                        format: "uuid",
                        description: "The invitation id.",
                    },
                    subtitle: {
                        type: "string",
                        maxLength: 4096,
                        minLength: 0,
                    },
                    summary: {
                        type: "string",
                        maxLength: 2048,
                        minLength: 0,
                    },
                },
            },
            PutCalendarEventRequest: {
                type: "object",
                properties: {
                    attachments: {
                        type: "array",
                        description: "Unique collection of event attachments.",
                        items: {
                            $ref: "#/components/schemas/CalendarEventAttachment",
                        },
                        maxItems: 128,
                        minItems: 0,
                        uniqueItems: true,
                    },
                    attendees: {
                        type: "array",
                        description: "Collection of the attendees.",
                        items: {
                            $ref: "#/components/schemas/CalendarEventAttendeeRequest",
                        },
                        maxItems: 4096,
                        minItems: 0,
                        uniqueItems: true,
                    },
                    calendarId: {
                        type: "string",
                        format: "uuid",
                        description: "The calendar id this event belongs to.",
                    },
                    comments: {
                        type: "array",
                        description: "Collection of event comments.",
                        items: {
                            type: "string",
                        },
                        maxItems: 32,
                        minItems: 0,
                        uniqueItems: true,
                    },
                    description: {
                        type: "string",
                        description: "Description of the event.",
                        maxLength: 4096,
                        minLength: 0,
                    },
                    interval: {
                        $ref: "#/components/schemas/ZonedDateTimeInterval",
                        description: "Interval indicating when the event is happening. It's optional, an event without an interval is a valid event in TimeTime. It can be useful to keep track of pending tasks that have not a date in the moment of its creation.",
                    },
                    locations: {
                        type: "array",
                        description: "Collection of event locations. An event will have typically no more than one location, but it can also have more than one, for example, a physical room and an online conference link.",
                        items: {
                            $ref: "#/components/schemas/CalendarEventLocation",
                        },
                        maxItems: 32,
                        minItems: 0,
                        uniqueItems: true,
                    },
                    notifications: {
                        type: "array",
                        description: "Collection of event notifications.",
                        items: {
                            oneOf: [
                                {
                                    $ref: "#/components/schemas/EmailConfirmationCalendarEventNotification",
                                },
                                {
                                    $ref: "#/components/schemas/SmsBeforeCalendarEventNotification",
                                },
                                {
                                    $ref: "#/components/schemas/SmsConfirmationCalendarEventNotification",
                                },
                                {
                                    $ref: "#/components/schemas/WhatsappBeforeCalendarEventNotification",
                                },
                                {
                                    $ref: "#/components/schemas/WhatsappConfirmationCalendarEventNotification",
                                },
                            ],
                        },
                        maxItems: 16,
                        minItems: 0,
                        uniqueItems: true,
                    },
                    status: {
                        type: "string",
                        default: "CONFIRMED",
                        description: "Status of the event.",
                        enum: ["CONFIRMED", "CANCELLED", "TENTATIVE"],
                    },
                    summary: {
                        type: "string",
                        description: "Summary (title) of the event.",
                        maxLength: 256,
                        minLength: 0,
                    },
                    tags: {
                        type: "object",
                        additionalProperties: {
                            type: "string",
                        },
                        description: "Arbitrary key/value collection. Useful for API users to store metadata.",
                    },
                },
                required: ["calendarId"],
            },
            PutEventTypeModel: {
                type: "object",
                properties: {
                    afterBuffer: {
                        type: "string",
                        format: "duration",
                        description: "Buffer time after the event.",
                    },
                    availableUnits: {
                        type: "integer",
                        format: "int32",
                        description: "For event types accepting multi-bookings, this sets the maximum number of people/resources that can book / be booked at the same time. Examples: \n- Restaurants: This is maximum number of people that can be attended at the same time.\n- Bikes store: This is the amount of bikes available.",
                        minimum: 1,
                    },
                    beforeBuffer: {
                        type: "string",
                        format: "duration",
                        description: "Buffer time before the event.",
                    },
                    bookingMode: {
                        description: "Booking mode for the event type.",
                        oneOf: [
                            {
                                $ref: "#/components/schemas/HoldBookingMode",
                            },
                            {
                                $ref: "#/components/schemas/InstantBookingMode",
                            },
                        ],
                    },
                    busyIntervals: {
                        type: "array",
                        description: "Set of intervals during which the event type is busy.",
                        items: {
                            $ref: "#/components/schemas/InstantInterval",
                        },
                        uniqueItems: true,
                    },
                    description: {
                        type: "string",
                        description: "Description of the event type.",
                    },
                    duration: {
                        type: "string",
                        format: "duration",
                        description: "It defines the duration of the event type.\nAllowed format is ISO-8601 duration, maximum unit allowed is days.",
                        example: "PT1H",
                    },
                    enabled: {
                        type: "boolean",
                        description: "When set to false, the event type will never be available.",
                    },
                    hosts: {
                        type: "array",
                        description: "Set of hosts associated with the event type.",
                        items: {
                            $ref: "#/components/schemas/ShareWithRequestModel",
                        },
                        uniqueItems: true,
                    },
                    i18n: {
                        $ref: "#/components/schemas/EventTypeI18nConfig",
                        description: "Internationalization config for the event type.",
                    },
                    imageUrl: {
                        type: "string",
                        format: "uri",
                        description: "URL of the image associated with the event type.",
                    },
                    location: {
                        description: "Location details for the event type.",
                        oneOf: [
                            {
                                $ref: "#/components/schemas/BookerPhoneLocation",
                            },
                            {
                                $ref: "#/components/schemas/BookerSelectionLocation",
                            },
                            {
                                $ref: "#/components/schemas/FixedLocation",
                            },
                            {
                                $ref: "#/components/schemas/GoogleMeetLocation",
                            },
                            {
                                $ref: "#/components/schemas/MicrosoftOutlookLocation",
                            },
                        ],
                    },
                    maxBookingNotice: {
                        type: "string",
                        format: "duration",
                        description: "Maximum notice period allowed for booking.",
                    },
                    maxBookingsPerTimeUnit: {
                        $ref: "#/components/schemas/MaxBookingsPerTimeUnit",
                        description: "Maximum number of bookings allowed per time unit.",
                    },
                    maxConcurrentBookings: {
                        type: "integer",
                        format: "int32",
                        description: "Limits how many concurrent bookings for this event type can happen at the same time. E.G, If it is set to 1, after one booking, the time slot is not available anymore. If null, then unlimited bookings can be made for the same time slot (unless 'availableUnits' is set).",
                        minimum: 1,
                    },
                    maxUnitsPerBooking: {
                        type: "integer",
                        format: "int32",
                        description: "Whenever the 'availableUnits' is set, this sets the limit of how many 'units' can be booked per booking. Examples: \n- Restaurants: This the maximum party size that can make a reservation, for example, up to groups of 10 people max.\n- City tour: The maximum number of people that each of your tour guides can manage.",
                        minimum: 1,
                    },
                    minBookingNotice: {
                        type: "string",
                        format: "duration",
                        description: "Minimum notice period required for booking.",
                    },
                    minUnitsPerBooking: {
                        type: "integer",
                        format: "int32",
                        description: "Minimum number of units per booking.",
                        minimum: 0,
                    },
                    name: {
                        type: "string",
                        description: "Name of the event type.",
                    },
                    notifications: {
                        $ref: "#/components/schemas/BookingNotifications",
                        description: "Notification settings for the event type.",
                    },
                    pricingPolicy: {
                        $ref: "#/components/schemas/PricingPolicyId",
                        description: "Pricing policy for the event type.",
                    },
                    questions: {
                        type: "array",
                        description: "List of questions associated with the event type.",
                        items: {
                            oneOf: [
                                {
                                    $ref: "#/components/schemas/EmailQuestion",
                                },
                                {
                                    $ref: "#/components/schemas/ImageQuestion",
                                },
                                {
                                    $ref: "#/components/schemas/LocationQuestion",
                                },
                                {
                                    $ref: "#/components/schemas/PasswordQuestion",
                                },
                                {
                                    $ref: "#/components/schemas/PhoneQuestion",
                                },
                                {
                                    $ref: "#/components/schemas/TextQuestion",
                                },
                            ],
                        },
                    },
                    redirectAfterBooking: {
                        $ref: "#/components/schemas/AfterBookingRedirect",
                        description: "Redirection settings after booking.",
                    },
                    repeatingAvailability: {
                        $ref: "#/components/schemas/RepeatingAvailabilityModel",
                        description: "Repeating availability settings for the event type.",
                    },
                    resourceRules: {
                        $ref: "#/components/schemas/ResourceRules",
                        description: "Rules for resource allocation for the event type.",
                    },
                    slug: {
                        type: "string",
                        description: "Slug for the event type, used in URLs.",
                        maxLength: 36,
                        minLength: 2,
                    },
                    step: {
                        type: "string",
                        format: "duration",
                        description: "It defines increments for showing the availability slots, example:\n- An step of 15 minutes (PT15M) of a 1 hour meeting, will show as bookable slots: 10:00, 10:15, 10:30, 10:45... \n- An step of 1 hour (PT1H) of a 1 hour meeting, will show as bookable slots: 10:00, 11:00, 12:00, 13:00... \nAllowed format is ISO-8601 duration, maximum unit allowed is days.",
                        example: "PT30M",
                    },
                    tags: {
                        type: "object",
                        additionalProperties: {
                            type: "string",
                        },
                        description: "Tags associated with the event type.",
                    },
                    thirdPartyCalendars: {
                        $ref: "#/components/schemas/ThirdPartyCalendarsModel",
                        description: "Third-party calendar settings for the event type.",
                    },
                    unitsLabel: {
                        type: "string",
                        description: "Units is a very generic concept, depending on the use case units could be referring to 'people', to 'bikes'... etc. The units label is to be able to set a custom label for the units field, that will appear in the booking page next to the 'units' selector.",
                        maxLength: 32,
                        minLength: 0,
                    },
                    userId: {
                        type: "string",
                        format: "uuid",
                        description: "User id of the owner, if not provided, the id of the current user is assumed.",
                    },
                    workflows: {
                        type: "array",
                        description: "List of active workflows for the event type.",
                        items: {
                            $ref: "#/components/schemas/AssociatedWorkflowModel",
                        },
                    },
                },
                required: [
                    "busyIntervals",
                    "duration",
                    "hosts",
                    "name",
                    "questions",
                    "step",
                    "thirdPartyCalendars",
                ],
            },
            PutOrganization: {
                type: "object",
                properties: {
                    domain: {
                        type: "string",
                        maxLength: 128,
                        minLength: 0,
                    },
                    image: {
                        type: "string",
                        format: "uri",
                    },
                    name: {
                        type: "string",
                        maxLength: 256,
                        minLength: 0,
                    },
                    tags: {
                        type: "object",
                        additionalProperties: {
                            type: "string",
                        },
                    },
                    webhooks: {
                        type: "array",
                        items: {
                            $ref: "#/components/schemas/WebhookDeliveryConfig",
                        },
                        maxItems: 16,
                        minItems: 0,
                        uniqueItems: true,
                    },
                },
                required: ["name"],
            },
            PutPricingPolicyRequest: {
                type: "object",
                properties: {
                    currency: {
                        type: "string",
                        description: "ISO 4217 Currency code",
                        example: "EUR",
                        examples: ["EUR", "USD"],
                    },
                    name: {
                        type: "string",
                        description: "Name of the pricing policy",
                        maxLength: 256,
                        minLength: 0,
                    },
                    overrides: {
                        type: "array",
                        items: {
                            $ref: "#/components/schemas/PricingPolicyOverride",
                        },
                    },
                    owner: {
                        description: "Owner of the pricing policy. If not specified, the user's id will be used.",
                        oneOf: [
                            {
                                $ref: "#/components/schemas/PricingPolicyOwnerOrg",
                            },
                            {
                                $ref: "#/components/schemas/PricingPolicyOwnerUser",
                            },
                        ],
                    },
                    priceSpecification: {
                        oneOf: [
                            {
                                $ref: "#/components/schemas/FixedPriceSpecification",
                            },
                            {
                                $ref: "#/components/schemas/TieredPriceSpecification",
                            },
                        ],
                    },
                    tags: {
                        type: "object",
                        additionalProperties: {
                            type: "string",
                        },
                        description: "Arbitrary key/value collection. Useful for API users to store metadata.",
                    },
                },
                required: ["currency", "name", "priceSpecification"],
            },
            PutProfileBody: {
                type: "object",
                properties: {
                    clientState: {
                        type: "string",
                        maxLength: 65535,
                        minLength: 0,
                    },
                    locale: {
                        type: "string",
                        format: "locale",
                    },
                    slug: {
                        type: "string",
                        maxLength: 36,
                        minLength: 2,
                        pattern: "^[a-zà-ú0-9\\uD83C-\\uDBFF\\uDC00-\\uDFFF]+(?:-[a-zà-ú0-9\\uD83C-\\uDBFF\\uDC00-\\uDFFF]+)*$",
                    },
                    tags: {
                        type: "object",
                        additionalProperties: {
                            type: "string",
                        },
                    },
                    timeZone: {
                        type: "string",
                    },
                },
                required: ["locale", "slug", "timeZone"],
            },
            PutResource: {
                type: "object",
                properties: {
                    bookingRules: {
                        $ref: "#/components/schemas/BookingRules",
                    },
                    collaborators: {
                        type: "array",
                        items: {
                            oneOf: [
                                {
                                    $ref: "#/components/schemas/OrganizationResourceCollaborator",
                                },
                            ],
                        },
                        maxItems: 32,
                        minItems: 0,
                        uniqueItems: true,
                    },
                    name: {
                        type: "string",
                        maxLength: 256,
                        minLength: 0,
                    },
                    tags: {
                        type: "object",
                        additionalProperties: {
                            type: "string",
                        },
                    },
                },
                required: ["collaborators", "name"],
            },
            PutResourceGroup: {
                type: "object",
                properties: {
                    name: {
                        type: "string",
                        maxLength: 256,
                        minLength: 0,
                    },
                    resources: {
                        type: "array",
                        items: {
                            $ref: "#/components/schemas/PutResourceInGroup",
                        },
                        maxItems: 4096,
                        minItems: 0,
                        uniqueItems: true,
                    },
                    tags: {
                        type: "object",
                        additionalProperties: {
                            type: "string",
                        },
                    },
                },
                required: ["name", "resources"],
            },
            PutResourceInGroup: {
                type: "object",
                properties: {
                    id: {
                        type: "string",
                        format: "uuid",
                    },
                },
                required: ["id"],
            },
            PutWorkflowRequest: {
                type: "object",
                discriminator: {
                    propertyName: "type",
                },
                properties: {
                    actions: {
                        type: "array",
                        items: {},
                        maxItems: 32,
                        minItems: 0,
                    },
                    name: {
                        type: "string",
                        description: "Workflow name",
                        maxLength: 256,
                        minLength: 0,
                    },
                    owner: {
                        description: "Workflow owner",
                        oneOf: [
                            {
                                $ref: "#/components/schemas/WorkflowOwnerOrg",
                            },
                            {
                                $ref: "#/components/schemas/WorkflowOwnerUser",
                            },
                        ],
                    },
                    tags: {
                        type: "object",
                        additionalProperties: {
                            type: "string",
                        },
                        description: "Arbitrary key/value collection. Useful for API users to store metadata.",
                    },
                    trigger: {
                        description: "Workflow trigger",
                    },
                    type: {
                        type: "string",
                    },
                },
                required: ["name", "owner", "trigger", "type"],
            },
            QuestionI18nConfig: {
                type: "object",
                properties: {
                    label: {
                        type: "object",
                        additionalProperties: {
                            type: "string",
                        },
                    },
                },
            },
            RepeatingAvailabilityModel: {
                type: "object",
                properties: {
                    timeZone: {
                        type: "string",
                    },
                    weekly: {
                        type: "object",
                        additionalProperties: {
                            type: "array",
                            items: {
                                $ref: "#/components/schemas/TimeRange",
                            },
                            uniqueItems: true,
                        },
                    },
                },
                required: ["timeZone", "weekly"],
            },
            Resource: {
                type: "object",
                properties: {
                    bookingRules: {
                        $ref: "#/components/schemas/BookingRules",
                    },
                    collaborators: {
                        type: "array",
                        items: {
                            oneOf: [
                                {
                                    $ref: "#/components/schemas/OrganizationResourceCollaborator",
                                },
                            ],
                        },
                        uniqueItems: true,
                    },
                    id: {
                        type: "string",
                        format: "uuid",
                    },
                    name: {
                        type: "string",
                    },
                    owner: {
                        $ref: "#/components/schemas/ResourceOwner",
                    },
                    tags: {
                        type: "object",
                        additionalProperties: {
                            type: "string",
                        },
                    },
                },
                required: [
                    "bookingRules",
                    "collaborators",
                    "id",
                    "name",
                    "owner",
                    "tags",
                ],
            },
            ResourceCollaborator: {
                type: "object",
                description: "Collaborators for the resource. Once a collaborator is added, that means the they can see and configure this resource as needed for their services.",
                discriminator: {
                    propertyName: "type",
                },
                properties: {
                    type: {
                        type: "string",
                    },
                },
                required: ["type"],
            },
            ResourceGroupId: {
                type: "object",
                properties: {
                    id: {
                        type: "string",
                        format: "uuid",
                    },
                },
                required: ["id"],
            },
            ResourceGroupModel: {
                type: "object",
                properties: {
                    id: {
                        type: "string",
                        format: "uuid",
                    },
                    name: {
                        type: "string",
                    },
                    resources: {
                        type: "array",
                        items: {
                            $ref: "#/components/schemas/Resource",
                        },
                        uniqueItems: true,
                    },
                    tags: {
                        type: "object",
                        additionalProperties: {
                            type: "string",
                        },
                    },
                },
                required: ["id", "name", "resources", "tags"],
            },
            ResourceGroupsListModel: {
                type: "object",
                properties: {
                    resourceGroups: {
                        type: "array",
                        items: {
                            $ref: "#/components/schemas/ResourceGroupModel",
                        },
                        uniqueItems: true,
                    },
                },
                required: ["resourceGroups"],
            },
            ResourceId: {
                type: "object",
                properties: {
                    id: {
                        type: "string",
                        format: "uuid",
                    },
                },
                required: ["id"],
            },
            ResourceOwner: {
                type: "object",
                properties: {
                    email: {
                        type: "string",
                    },
                    id: {
                        type: "string",
                        format: "uuid",
                    },
                },
                required: ["email", "id"],
            },
            ResourceRules: {
                type: "object",
                properties: {
                    availableInGroups: {
                        type: "array",
                        items: {
                            $ref: "#/components/schemas/AvailableInGroupRule",
                        },
                        uniqueItems: true,
                    },
                    linkedResources: {
                        type: "array",
                        description: "Linked resources are useful to specify dependencies among different resources/event types. When linked resources are configured, the availability of those will be taken into account for the event type availability check. Also, when a booking is performed, these linked resources will be booked as well",
                        items: {
                            $ref: "#/components/schemas/ResourceId",
                        },
                        uniqueItems: true,
                    },
                },
            },
            ResourcesList: {
                type: "object",
                properties: {
                    resources: {
                        type: "array",
                        items: {
                            $ref: "#/components/schemas/Resource",
                        },
                        uniqueItems: true,
                    },
                },
                required: ["resources"],
            },
            SendUpcomingBookingsEmailRequest: {
                type: "object",
                properties: {
                    email: {
                        type: "string",
                    },
                    locale: {
                        type: "string",
                        format: "locale",
                    },
                },
                required: ["email"],
            },
            ShareWithRequestModel: {
                type: "object",
                properties: {
                    email: {
                        type: "string",
                    },
                },
                required: ["email"],
            },
            SmsBeforeCalendarEventNotification: {
                allOf: [
                    {
                        $ref: "#/components/schemas/CalendarEventNotification",
                    },
                    {
                        type: ["object"],
                        example: null,
                        properties: {
                            before: {
                                type: "string",
                                format: "duration",
                                description: "How much before the start of the event the notification needs to be triggered, in ISO8601 duration format.For sending the notification 15 minutes before the event, PT15M is a valid value.",
                                examples: ["PT1H", "PT30M"],
                            },
                            id: {
                                type: "string",
                                format: "uuid",
                                description: "The notification id.",
                            },
                            locale: {
                                type: "string",
                                format: "locale",
                                description: "Locale to be used to send the notification.",
                            },
                            phone: {
                                type: "string",
                                description: "The phone number of the receiver, in e164 format.",
                            },
                        },
                    },
                ],
                required: ["before", "id", "locale", "phone"],
            },
            SmsConfirmationCalendarEventNotification: {
                allOf: [
                    {
                        $ref: "#/components/schemas/CalendarEventNotification",
                    },
                    {
                        type: ["object"],
                        example: null,
                        properties: {
                            id: {
                                type: "string",
                                format: "uuid",
                                description: "The notification id.",
                            },
                            locale: {
                                type: "string",
                                format: "locale",
                                description: "Locale to be used to send the notification.",
                            },
                            phone: {
                                type: "string",
                                description: "The phone number of the receiver, in e164 format.",
                            },
                        },
                    },
                ],
                required: ["id", "locale", "phone"],
            },
            StartDateCalendarEventInvitationInterval: {
                allOf: [
                    {
                        $ref: "#/components/schemas/CalendarEventInvitationEvent",
                    },
                    {
                        type: ["object"],
                        example: null,
                        properties: {
                            date: {
                                type: "string",
                                format: "date",
                                description: "The start date of the invitation, ISO 8601 format, YYYY-MM-DD",
                            },
                            timeZone: {
                                type: "string",
                                description: 'The time zone in which the time is specified. (Formatted as an IANA Time Zone Database name, e.g. "Europe/Zurich".)',
                                example: "Europe/Madrid",
                            },
                        },
                    },
                ],
                required: ["date", "timeZone"],
            },
            Tenant: {
                type: "object",
                properties: {
                    domain: {
                        type: "string",
                        description: "Domain of the tenant.",
                    },
                    id: {
                        type: "string",
                        description: "Id of the tenant",
                    },
                    name: {
                        type: "string",
                        description: "Name of the tenant",
                    },
                    webAppConfig: {
                        type: "object",
                        additionalProperties: {},
                        description: "Free form JSON object for the web app config.",
                    },
                    webhooks: {
                        type: "array",
                        description: "Global webhooks for the tenant.",
                        items: {
                            $ref: "#/components/schemas/WebhookDeliveryConfig",
                        },
                        uniqueItems: true,
                    },
                },
                required: ["id", "name", "webAppConfig", "webhooks"],
            },
            TenantMembershipModel: {
                type: "object",
                properties: {
                    id: {
                        type: "string",
                    },
                    role: {
                        type: "string",
                    },
                },
                required: ["id", "role"],
            },
            TextQuestion: {
                allOf: [
                    {
                        $ref: "#/components/schemas/EventTypeQuestion",
                    },
                    {
                        type: ["object"],
                        example: null,
                        properties: {
                            canBeDeleted: {
                                type: "boolean",
                                readOnly: true,
                            },
                        },
                    },
                ],
                required: ["id", "label"],
            },
            ThirdPartyCalendarEvent: {
                type: "object",
                properties: {
                    calendar: {
                        $ref: "#/components/schemas/ThirdPartyCalendarModel",
                    },
                    interval: {
                        $ref: "#/components/schemas/InstantInterval",
                    },
                },
                required: ["calendar", "interval"],
            },
            ThirdPartyCalendarEventsList: {
                type: "object",
                properties: {
                    events: {
                        type: "array",
                        items: {
                            $ref: "#/components/schemas/ThirdPartyCalendarEvent",
                        },
                    },
                },
                required: ["events"],
            },
            ThirdPartyCalendarId: {
                type: "object",
                properties: {
                    id: {
                        type: "string",
                    },
                },
                required: ["id"],
            },
            ThirdPartyCalendarModel: {
                type: "object",
                properties: {
                    account: {
                        type: "string",
                    },
                    description: {
                        type: "string",
                    },
                    id: {
                        type: "string",
                    },
                    name: {
                        type: "string",
                    },
                    primary: {
                        type: "boolean",
                    },
                    provider: {
                        type: "string",
                    },
                    readOnly: {
                        type: "boolean",
                    },
                },
                required: ["account", "id", "name", "primary", "provider", "readOnly"],
            },
            ThirdPartyCalendarsModel: {
                type: "object",
                properties: {
                    toSyncBookings: {
                        type: "array",
                        items: {
                            $ref: "#/components/schemas/ThirdPartyCalendarId",
                        },
                        uniqueItems: true,
                    },
                    toVerifyAvailability: {
                        type: "array",
                        items: {
                            $ref: "#/components/schemas/ThirdPartyCalendarId",
                        },
                        uniqueItems: true,
                    },
                },
                required: ["toSyncBookings", "toVerifyAvailability"],
            },
            ThirdPartyConsentBody: {
                type: "object",
                properties: {
                    authCode: {
                        type: "string",
                    },
                    provider: {
                        type: "string",
                        enum: ["MICROSOFT"],
                    },
                },
                required: ["authCode", "provider"],
            },
            TieredPriceItem: {
                type: "object",
                properties: {
                    amount: {
                        type: "string",
                        description: "Amount expressed in an string to avoid precisions loses.",
                        examples: ["12.45", "20"],
                    },
                    duration: {
                        type: "string",
                        format: "duration",
                        description: "Allowed format is ISO-8601 duration, maximum unit allowed is days",
                        examples: ["PT1H", "PT30M"],
                    },
                },
                required: ["amount", "duration"],
            },
            TieredPriceSpecification: {
                allOf: [
                    {
                        $ref: "#/components/schemas/PriceSpecification",
                    },
                    {
                        type: ["object"],
                        example: null,
                        properties: {
                            items: {
                                type: "array",
                                items: {
                                    $ref: "#/components/schemas/TieredPriceItem",
                                },
                                maxItems: 64,
                                minItems: 1,
                            },
                        },
                    },
                ],
                required: ["items"],
            },
            TimeRange: {
                type: "object",
                properties: {
                    end: {
                        type: "string",
                    },
                    start: {
                        type: "string",
                    },
                },
                required: ["end", "start"],
            },
            Unit: {
                type: "object",
            },
            Units: {
                type: "object",
                properties: {
                    availableUnits: {
                        type: "integer",
                        format: "int32",
                        description: "For event types accepting multi-bookings, this sets the maximum number of people/resources that can book / be booked at the same time. Examples: \n- Restaurants: This is maximum number of people that can be attended at the same time.\n- Bikes store: This is the amount of bikes available.",
                        minimum: 1,
                    },
                    maxUnitsPerBooking: {
                        type: "integer",
                        format: "int32",
                        description: "Whenever the 'availableUnits' is set, this sets the limit of how many 'units' can be booked per booking. Examples: \n- Restaurants: This the maximum party size that can make a reservation, for example, up to groups of 10 people max.\n- City tour: The maximum number of people that each of your tour guides can manage.",
                        minimum: 1,
                    },
                    minUnitsPerBooking: {
                        type: "integer",
                        format: "int32",
                        minimum: 1,
                    },
                    unitsLabel: {
                        type: "string",
                        description: "Units is a very generic concept, depending on the use case units could be referring to 'people', to 'bikes'... etc. The units label is to be able to set a custom label for the units field, that will appear in the booking page next to the 'units' selector.",
                        maxLength: 32,
                        minLength: 0,
                    },
                },
            },
            UpcomingBooking: {
                allOf: [
                    {
                        $ref: "#/components/schemas/Webhook",
                    },
                    {
                        type: ["object"],
                        example: null,
                        properties: {
                            booking: {
                                $ref: "#/components/schemas/Booking",
                            },
                        },
                    },
                ],
                required: ["booking"],
            },
            UsedBookingResource: {
                type: "object",
                properties: {
                    id: {
                        type: "string",
                        format: "uuid",
                    },
                },
                required: ["id"],
            },
            User: {
                type: "object",
                properties: {
                    clientState: {
                        type: "string",
                    },
                    email: {
                        type: "string",
                    },
                    externalId: {
                        type: "string",
                    },
                    locale: {
                        type: "string",
                        format: "locale",
                    },
                    organizationMemberships: {
                        type: "array",
                        items: {
                            $ref: "#/components/schemas/OrganizationMembership",
                        },
                        uniqueItems: true,
                    },
                    slug: {
                        type: "string",
                    },
                    tags: {
                        type: "object",
                        additionalProperties: {
                            type: "string",
                        },
                    },
                    tenant: {
                        $ref: "#/components/schemas/TenantMembershipModel",
                    },
                    thirdPartyCalendars: {
                        type: "array",
                        items: {
                            $ref: "#/components/schemas/ThirdPartyCalendarModel",
                        },
                    },
                    timeZone: {
                        type: "string",
                    },
                    userId: {
                        type: "string",
                        format: "uuid",
                    },
                },
                required: [
                    "clientState",
                    "email",
                    "locale",
                    "organizationMemberships",
                    "slug",
                    "tags",
                    "tenant",
                    "thirdPartyCalendars",
                    "timeZone",
                    "userId",
                ],
            },
            Webhook: {
                type: "object",
                description: "The webhooks that TimeTime is able to send to the subscribed server.\nAll the payloads will include a 'type' field indicating which type of event triggered the webhook.",
                discriminator: {
                    propertyName: "type",
                },
                properties: {
                    type: {
                        type: "string",
                    },
                },
                required: ["type"],
            },
            WebhookDeliveryConfig: {
                type: "object",
                properties: {
                    password: {
                        type: "string",
                        description: "A password to be used when calling the webhook URL. It'll be sent as the value of the 'X-TT-Webhook-Password' header.",
                        maxLength: 2048,
                        minLength: 0,
                    },
                    url: {
                        type: "string",
                        format: "uri",
                        maxLength: 2048,
                        minLength: 0,
                    },
                },
                required: ["url"],
            },
            WhatsappBeforeCalendarEventNotification: {
                allOf: [
                    {
                        $ref: "#/components/schemas/CalendarEventNotification",
                    },
                    {
                        type: ["object"],
                        example: null,
                        properties: {
                            additionalInformation: {
                                type: "string",
                                description: "Additional information to be appended to the whatsapp message.",
                                maxLength: 1024,
                                minLength: 0,
                            },
                            before: {
                                type: "string",
                                format: "duration",
                                description: "How much before the start of the event the notification needs to be triggered, in ISO8601 duration format.For sending the notification 15 minutes before the event, PT15M is a valid value.",
                                examples: ["PT1H", "PT30M"],
                            },
                            id: {
                                type: "string",
                                format: "uuid",
                                description: "The notification id.",
                            },
                            locale: {
                                type: "string",
                                format: "locale",
                                description: "Locale to be used to send the notification.",
                            },
                            phone: {
                                type: "string",
                                description: "The phone number of the receiver, in e164 format.",
                            },
                        },
                    },
                ],
                required: ["additionalInformation", "before", "id", "locale", "phone"],
            },
            WhatsappConfirmationCalendarEventNotification: {
                allOf: [
                    {
                        $ref: "#/components/schemas/CalendarEventNotification",
                    },
                    {
                        type: ["object"],
                        example: null,
                        properties: {
                            additionalInformation: {
                                type: "string",
                                description: "Additional information to be appended to the whatsapp message.",
                                maxLength: 1024,
                                minLength: 0,
                            },
                            id: {
                                type: "string",
                                format: "uuid",
                                description: "The notification id.",
                            },
                            locale: {
                                type: "string",
                                format: "locale",
                                description: "Locale to be used to send the notification.",
                            },
                            phone: {
                                type: "string",
                                description: "The phone number of the receiver, in e164 format.",
                            },
                        },
                    },
                ],
                required: ["id", "locale", "phone"],
            },
            Workflow: {
                type: "object",
                properties: {
                    actions: {
                        type: "array",
                        items: {
                            oneOf: [
                                {
                                    $ref: "#/components/schemas/AfterConfirmingBookingWorkflowAction",
                                },
                                {
                                    $ref: "#/components/schemas/GoogleCalendarEventBookingNotification",
                                },
                                {
                                    $ref: "#/components/schemas/GoogleCalendarOutOfOfficeBookingNotification",
                                },
                            ],
                        },
                    },
                    id: {
                        type: "string",
                        format: "uuid",
                        description: "The workflow unique id.",
                    },
                    name: {
                        type: "string",
                    },
                    owner: {
                        description: "Workflow owner",
                        oneOf: [
                            {
                                $ref: "#/components/schemas/WorkflowOwnerOrg",
                            },
                            {
                                $ref: "#/components/schemas/WorkflowOwnerUser",
                            },
                        ],
                    },
                    tags: {
                        type: "object",
                        additionalProperties: {
                            type: "string",
                        },
                        description: "Arbitrary key/value collection. Useful for API users to store metadata.",
                    },
                    trigger: {
                        oneOf: [
                            {
                                $ref: "#/components/schemas/AfterConfirmingBookingTrigger",
                            },
                            {
                                $ref: "#/components/schemas/BeforeEventTrigger",
                            },
                        ],
                    },
                },
                required: ["actions", "id", "name", "owner", "tags"],
            },
            WorkflowAction: {
                type: "object",
                discriminator: {
                    propertyName: "type",
                },
                properties: {
                    type: {
                        type: "string",
                    },
                },
                required: ["type"],
            },
            WorkflowOwner: {
                type: "object",
                description: "Workflow owner",
                discriminator: {
                    propertyName: "type",
                },
                properties: {
                    type: {
                        type: "string",
                    },
                },
                required: ["type"],
            },
            WorkflowOwnerOrg: {
                allOf: [
                    {
                        $ref: "#/components/schemas/WorkflowOwner",
                    },
                    {
                        type: ["object"],
                        example: null,
                        properties: {
                            id: {
                                type: "string",
                                format: "uuid",
                            },
                        },
                    },
                ],
                required: ["id"],
            },
            WorkflowOwnerUser: {
                allOf: [
                    {
                        $ref: "#/components/schemas/WorkflowOwner",
                    },
                    {
                        type: ["object"],
                        example: null,
                        properties: {
                            id: {
                                type: "string",
                                format: "uuid",
                            },
                        },
                    },
                ],
                required: ["id"],
            },
            WorkflowTrigger: {
                type: "object",
                discriminator: {
                    propertyName: "type",
                },
                properties: {
                    type: {
                        type: "string",
                    },
                },
                required: ["type"],
            },
            WorkflowsList: {
                type: "object",
                properties: {
                    workflows: {
                        type: "array",
                        items: {
                            $ref: "#/components/schemas/Workflow",
                        },
                        uniqueItems: true,
                    },
                },
                required: ["workflows"],
            },
            ZonedDateTime: {
                type: "object",
                description: "The time zone parameter is optional, the dateTime must include the offset.",
                properties: {
                    dateTime: {
                        type: "string",
                        format: "date-time",
                        description: "The time, as a combined date-time value, following the ISO 8601 standard.",
                    },
                    timeZone: {
                        type: "string",
                        description: 'The time zone in which the time is specified. (Formatted as an IANA Time Zone Database name, e.g. "Europe/Zurich".) ',
                        example: "Europe/Madrid",
                    },
                },
                required: ["dateTime"],
            },
            ZonedDateTimeInterval: {
                type: "object",
                description: "A date time interval, inclusive in the beginning and exclusive in the end. This allows to specify even times in a natural way, such as start: '2024-01-01T14:00:00Z' end: '2024-01-01T15:00:00Z'.",
                properties: {
                    exclusiveEnd: {
                        $ref: "#/components/schemas/ZonedDateTime",
                        description: "Exclusive end date time.",
                    },
                    inclusiveStart: {
                        $ref: "#/components/schemas/ZonedDateTime",
                        description: "Inclusive start date time.",
                    },
                },
                required: ["exclusiveEnd", "inclusiveStart"],
            },
        },
        securitySchemes: {
            HttpAuth: {
                bearerFormat: "JWT or TimeTime API Key",
                name: "HttpAuth",
                scheme: "bearer",
                type: "http",
            },
        },
    },
};
//# sourceMappingURL=spec.js.map