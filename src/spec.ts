// Type definitions for OpenAPI spec
type OpenAPISpec = {
  openapi: string;
  info: any;
  servers: Array<{ url: string; description: string }>;
  security: Array<Record<string, any[]>>;
  paths: Record<string, Record<string, any>>;
  components?: {
    securitySchemes?: Record<string, any>;
    schemas?: Record<string, any>;
  };
  tags?: Array<{
    name: string;
    description?: string;
    externalDocs?: {
      description?: string;
      url: string;
    };
  }>;
  externalDocs?: {}
};



export const spec: OpenAPISpec = {
  "openapi" : "3.1.0",
  "info" : {
    "contact" : {
      "email" : "info@timetime.in",
      "name" : "TimeTime Support",
      "url" : "https://timetime.in"
    },
    "description" : "TimeTime is a comprehensive scheduling and booking platform designed for versatile use cases including:\n\n- **Appointment Scheduling**: Manage bookings for services, consultations, and appointments\n- **Resource Management**: Schedule and allocate physical spaces, equipment, and other resources\n- **Team Coordination**: Organize teams through organizations with defined roles and permissions\n- **Workflow Automation**: Create and manage custom workflows for booking processes\n- **Calendar Integration**: Sync with external calendar systems\n\nThis API provides programmatic access to all TimeTime functionality, allowing developers to integrate scheduling capabilities into their applications or create custom interfaces for specific use cases.\n\n## Core Domain Concepts\n\nTimeTime is organized around the following key domain concepts:\n\n- **Tenant**: The top-level organizational unit in TimeTime, representing an isolated customer environment with its own users, resources, and settings.\n- **User**: Individual accounts that can access and manage various aspects of the system based on their permissions.\n- **Organization**: Groups of users who collaborate and share resources, with defined roles and permissions.\n- **Event Type**: Templates for different kinds of bookable services or appointments, defining duration, availability, and other scheduling parameters.\n- **Resource**: Any bookable entity such as people, spaces, equipment, or services.\n- **Booking**: Scheduled appointments or reservations created through event types.\n- **Calendar**: Representation of availability and scheduled events, with support for syncing with external calendar systems.\n- **Workflow**: Customizable processes that can be triggered before, during, or after bookings.\n- **API Key**: Credentials for programmatic access to the API with the same permissions as the authenticated user.\n\n## Getting Started\n\n1. **Authentication**: Obtain JWT tokens or create API keys\n2. **Resource Management**: Create and configure your bookable resources\n3. **Event Type Setup**: Define the types of appointments or services you offer\n4. **Workflow Configuration**: Set up automations for your booking processes\n5. **Integration**: Use webhooks or the API to integrate with your existing systems\n\n## Error Handling\n\nThe TimeTime API uses conventional HTTP response codes to indicate the success or failure of API requests:\n\n- **2xx**: Success - The request was successfully received, understood, and accepted\n- **4xx**: Client Error - The request contains bad syntax or cannot be fulfilled\n- **5xx**: Server Error - The server failed to fulfill a valid request\n\nCommon error status codes include:\n- **400 Bad Request**: The request was malformed or contained invalid parameters\n- **401 Unauthorized**: Authentication credentials are missing or invalid\n- **403 Forbidden**: The authenticated user doesn't have permission to access the requested resource\n- **404 Not Found**: The specified resource does not exist\n- **409 Conflict**: The request could not be processed due to a conflict with the current state of the resource\n- **429 Too Many Requests**: You've exceeded the API rate limits\n\nError responses include a structured body with:\n- **status**: The HTTP status code\n- **detail**: Human-readable error message\n- **type**: URI reference identifying the error type\n- **instance**: URI identifying the specific occurrence of the error\n\n## Rate Limiting\n\nAPI requests are rate limited to ensure fair usage and system stability. Rate limits are based on:\n\n- API key or user authentication\n- Endpoint category (read vs. write operations)\n- Subscription tier\n\nWhen you exceed rate limits, you'll receive a 429 Too Many Requests response.\n\n## API Versioning\n\nThe TimeTime API uses endpoint-specific versioning rather than versioning the entire API at once. This means:\n\n- The base URL path includes the major version (v1): `https://api.timetime.in/v1/resources`\n- Breaking changes to specific endpoints are managed individually\n- When we need to make breaking changes to an endpoint, we'll introduce a new version for that specific endpoint while maintaining the old one during a deprecation period\n- This approach allows for more granular evolution of the API without requiring clients to upgrade everything at once\n\nThis strategy enables us to evolve different parts of the API at different rates based on needs and usage patterns, while minimizing disruption to existing integrations.\n\n## REST Methods\n\nThe TimeTime API follows REST principles with some specific implementation details:\n\n- **GET**: Used for retrieving resources without side effects\n- **POST**: Used for non-idempotent creation operations where the server assigns the resource identifier\n- **PUT**: Used for idempotent create/update operations where the client specifies the resource identifier\n  - Our API utilizes PUT extensively for both creation and updates of resources with known identifiers\n  - For example, `PUT /v1/event-types/{id}` will create the event type if it doesn't exist, or update it if it does\n  - This idempotent approach allows safer retry mechanisms in case of network failures\n  - The same request can be safely repeated without causing multiple creations or unintended side effects\n- **PATCH**: Used for partial updates to resources\n- **DELETE**: Used for removing resources\n\nThis approach to REST methods, particularly the idempotent use of PUT for create/update operations, provides a more robust API experience for integrators by reducing complexity and error handling.\n                        ",
    "license" : {
      "name" : "TimeTime API License",
      "url" : "https://timetime.in/terms"
    },
    "termsOfService" : "https://timetime.in/terms",
    "title" : "TimeTime API",
    "version" : "v1"
  },
  "servers" : [ {
    "url" : "https://api.timetime.in",
    "description" : "Production API server for live integrations"
  } ],
  "security" : [ {
    "HttpAuth" : [ ]
  } ],
  "tags" : [ {
    "description" : "Operations for managing tenants - the top-level organizational units in TimeTime.\n\nTenants represent isolated customer environments with their own users, resources, and settings. Use these endpoints to:\n- Create new tenant environments\n- Configure tenant-wide settings and preferences\n- Manage tenant subscription and billing information\n- Control tenant access and security policies\n- View tenant usage statistics and reports\n\nEach tenant operates as a separate entity with its own data isolation, making these endpoints particularly important for multi-tenant SaaS integrations.",
    "name" : "tenants"
  }, {
    "description" : "User management operations including creation, reading, updating, and authentication.\n\nThese endpoints allow you to:\n- Register new users and manage user profiles\n- Handle user authentication and authorization\n- Manage user preferences and settings\n- Control user permissions and access levels\n- Handle password resets and account recovery\n- Manage user sessions and tokens\n\nUser endpoints form the foundation of identity management within the TimeTime platform and are typically the starting point for most integrations.",
    "name" : "users"
  }, {
    "description" : "Operations for creating and managing organizations and their members.\n\nOrganizations are groups of users who collaborate and share resources. These endpoints enable:\n- Creating and configuring organizations\n- Managing organization membership and roles\n- Defining custom roles and permission sets\n- Setting organization-wide policies\n- Managing team structures within organizations\n- Handling organization billing and subscription details\n\nOrganizations provide the collaborative framework within TimeTime, making these endpoints essential for team-based scheduling applications.",
    "name" : "organizations"
  }, {
    "description" : "Endpoints for defining and managing bookable event types and services.\n\nEvent types are templates for different kinds of bookable services or appointments. Use these endpoints to:\n- Create and configure event types with specific durations, buffers, and settings\n- Set up availability rules and scheduling constraints\n- Configure booking questions and required information\n- Manage event type visibility and access control\n- Set up pricing and payment requirements\n- Create recurring event types and series\n\nEvent types define what can be booked, making these endpoints central to configuring your scheduling offerings.",
    "name" : "event-types"
  }, {
    "description" : "Resource management for people, spaces, equipment, and other bookable entities.\n\nResources represent any bookable entity in the system. These endpoints allow you to:\n- Create and manage different resource types (people, rooms, equipment, etc.)\n- Set resource availability and capacity\n- Configure resource properties and attributes\n- Group and categorize resources\n- Manage resource dependencies and requirements\n- Handle resource allocation and conflicts\n\nResources are the entities being scheduled, making these endpoints crucial for resource management applications.",
    "name" : "resources"
  }, {
    "description" : "Operations for creating, viewing, updating, and canceling bookings.\n\nBookings are the actual scheduled appointments or reservations. These endpoints enable:\n- Creating new bookings with specified resources and time slots\n- Retrieving booking details and history\n- Updating booking information and status\n- Handling booking cancellations and rescheduling\n- Managing booking confirmations and reminders\n- Handling booking conflicts and availability checks\n\nThese endpoints represent the core scheduling functionality of the TimeTime platform.",
    "name" : "bookings"
  }, {
    "description" : "Calendar operations including availability checking and external calendar sync.\n\nCalendar endpoints provide functionality for:\n- Checking resource and user availability\n- Managing calendar connections and permissions\n- Handling calendar events and busy times\n- Setting working hours and availability patterns\n- Managing time zones and date formatting\n\nThese endpoints are essential for integrating TimeTime with existing calendar ecosystems and ensuring accurate availability information.",
    "name" : "calendars"
  }, {
    "description" : "Management of automation workflows for booking processes.\n\nWorkflow endpoints allow you to create and manage automated processes that trigger before, during, or after bookings:\n- Creating custom workflow definitions\n- Configuring workflow triggers and conditions\n- Setting up email and notification templates\n- Managing approval processes and conditional logic\n- Monitoring workflow execution and history\n\nWorkflows add automation to the booking process, making these endpoints valuable for creating sophisticated scheduling experiences.",
    "name" : "workflows"
  }, {
    "description" : "Operations for managing pricing policies that define how services and products are priced.\n\nPricing policies establish pricing rules and structures for bookable services. These endpoints enable:\n- Creating and updating pricing policies with base prices and conditional overrides\n- Retrieving detailed information about specific pricing policies\n- Listing all available pricing policies\n- Deleting pricing policies that are no longer needed\n- Setting currency and price specifications for different services\n- Defining conditional pricing rules based on customer segments, time periods, or other factors\n\nPricing policies are essential for implementing flexible pricing strategies and monetization models within the TimeTime platform.",
    "name" : "pricing-policies"
  }, {
    "description" : "API key management for programmatic access.\n\nThese endpoints allow you to:\n- Generate new API keys for server-to-server authentication\n- Manage API key permissions and scopes\n- Set up API key expiration and security policies\n\nAPI keys are essential for secure programmatic access to the TimeTime API, particularly for backend integrations and automated processes.",
    "name" : "api-keys"
  } ],
  "paths" : {
    "/v1/accepted-org-invitations" : {
      "post" : {
        "description" : "Accepts an invitation to join an organization using the provided invitation code.\n\nThis endpoint allows users to join organizations they've been invited to. When a user is invited to an organization,\nthey receive an invitation code which they can use with this endpoint to accept the invitation and become a member\nof the organization.\n\nThe invitation code is validated to ensure it exists and hasn't expired. Once accepted, the user will be granted\nthe permissions associated with their assigned role in the organization.",
        "operationId" : "postAcceptedOrganizationInvite",
        "requestBody" : {
          "content" : {
            "application/json" : {
              "schema" : {
                "$ref" : "#/components/schemas/AcceptedOrganizationInvite"
              }
            }
          },
          "required" : true
        },
        "responses" : {
          "204" : {
            "content" : { },
            "description" : "The invitation was successfully accepted and the user is now a member of the organization."
          },
          "403" : {
            "content" : { },
            "description" : "Forbidden - The authenticated user does not have permission to accept this invitation."
          },
          "404" : {
            "content" : { },
            "description" : "Not Found - The invitation code is invalid, expired, or has already been used."
          }
        },
        "summary" : "Accept an organization invitation",
        "tags" : [ "organizations" ]
      }
    },
    "/v1/api-keys" : {
      "get" : {
        "description" : "Retrieves a list of all API keys created by the authenticated user.\n\nAPI keys in TimeTime provide programmatic access to the API with the same permissions as the authenticated user.\nThey are commonly used for:\n- Integrating TimeTime with external systems\n- Building custom applications that interact with TimeTime\n- Automating workflows and processes\n- Scheduled tasks and background operations\n\nThis endpoint returns all API keys owned by the authenticated user, including their IDs and names.\nFor security reasons, the full API key strings are not returned in this response - they are only\nprovided once when initially created.\n\nNote that API keys inherit the permissions of the user who created them. If a user's permissions\nchange, all their API keys will immediately reflect those permission changes.",
        "operationId" : "listUserApiKeys",
        "responses" : {
          "200" : {
            "content" : {
              "application/json" : {
                "schema" : {
                  "$ref" : "#/components/schemas/ApiKeysListModel"
                }
              }
            },
            "description" : "Successfully retrieved the list of API keys. Returns an empty collection if the user has no API keys."
          },
          "403" : {
            "content" : {
              "application/json" : {
                "schema" : {
                  "$ref" : "#/components/schemas/ApiKeysListModel"
                }
              }
            },
            "description" : "Forbidden - The authenticated user does not have permission to list API keys or is not authenticated as a Customer."
          }
        },
        "summary" : "List all API keys for the authenticated user",
        "tags" : [ "api-keys" ]
      },
      "post" : {
        "description" : "Creates a new API key for the authenticated user.\nAPI keys allow programmatic access to the TimeTime API and can be used for integration with external systems.\nThe created key will have the same permissions as the authenticated user.\n\nThe API key should be securely stored as it will only be returned once in the response to this request.\nIf the key is lost, a new key must be created and the old one deleted.",
        "operationId" : "createApiKey",
        "requestBody" : {
          "content" : {
            "application/json" : {
              "schema" : {
                "$ref" : "#/components/schemas/CreateApiKeyBody"
              }
            }
          },
          "required" : true
        },
        "responses" : {
          "201" : {
            "content" : {
              "application/json" : {
                "schema" : {
                  "$ref" : "#/components/schemas/CreateApiKeyResponseModel"
                }
              }
            },
            "description" : "The API key was successfully created. The response includes the key ID and the actual API key string."
          },
          "403" : {
            "content" : {
              "application/json" : {
                "schema" : {
                  "$ref" : "#/components/schemas/CreateApiKeyResponseModel"
                }
              }
            },
            "description" : "Forbidden - The authenticated user does not have permission to create API keys."
          }
        },
        "summary" : "Create a new API key",
        "tags" : [ "api-keys" ]
      }
    },
    "/v1/bookings" : {
      "get" : {
        "description" : "Retrieves a list of bookings that the authenticated user has access to view.\n\nThis endpoint returns bookings based on the user's permissions and the specified filters. It's designed for:\n- Users to view their own bookings\n- Event type owners to view bookings for their event types\n- Organization administrators to view bookings within their organization\n\nThe response includes booking details such as event type information, scheduled time, booker information,\nstatus, and other relevant booking data. The results can be filtered by date range and specific event type.",
        "operationId" : "listBookings",
        "parameters" : [ {
          "description" : "Start date for filtering bookings. If not provided, defaults to the current time.",
          "in" : "query",
          "name" : "from",
          "required" : false,
          "schema" : {
            "type" : "string",
            "format" : "date-time"
          }
        }, {
          "description" : "Number of days to include in the date range filter. Minimum 1, maximum 50.",
          "in" : "query",
          "name" : "days",
          "required" : false,
          "schema" : {
            "type" : "integer",
            "format" : "int64",
            "default" : 14,
            "maximum" : 50,
            "minimum" : 1
          }
        }, {
          "description" : "Optional filter to show only bookings for a specific event type.",
          "in" : "query",
          "name" : "eventTypeId",
          "required" : false,
          "schema" : {
            "type" : "string",
            "format" : "uuid"
          }
        } ],
        "responses" : {
          "200" : {
            "content" : {
              "application/json" : {
                "schema" : {
                  "$ref" : "#/components/schemas/BookingsList"
                }
              }
            },
            "description" : "Successfully retrieved the list of accessible bookings. Returns booking details including event type information, scheduled times, and status."
          },
          "403" : {
            "content" : {
              "application/json" : {
                "schema" : {
                  "$ref" : "#/components/schemas/BookingsList"
                }
              }
            },
            "description" : "Forbidden - The authenticated user does not have permission to access the requested bookings."
          }
        },
        "summary" : "List bookings accessible to the authenticated user",
        "tags" : [ "bookings" ]
      },
      "post" : {
        "description" : "Creates a new booking for a specific event type at the requested time.\n\nThis endpoint is designed for public access and does not require authentication, making it suitable for its usage in public booking pages.\n\nThis endpoint is typically used by public-facing booking pages to allow users to schedule appointments or services.\nThe booking process includes validation of the requested time slot availability, confirmation of the event type's existence,\nand validation of any required questions or custom fields.\n\nThe request must include an event type ID, start time, and may include additional information such as answers to\ncustom questions, booking notes, and the number of resource units being reserved.",
        "operationId" : "createBooking",
        "requestBody" : {
          "content" : {
            "application/json" : {
              "schema" : {
                "$ref" : "#/components/schemas/CreateBookingRequest"
              }
            }
          },
          "required" : true
        },
        "responses" : {
          "201" : {
            "content" : {
              "application/json" : {
                "schema" : {
                  "type" : "object"
                }
              }
            },
            "description" : "The booking was successfully created. The response includes the newly created booking ID and the location header contains the URL to retrieve the booking details."
          },
          "400" : {
            "content" : {
              "application/json" : {
                "schema" : {
                  "type" : "object"
                }
              }
            },
            "description" : "Bad Request - The request contains invalid parameters or validation errors.\nThis can occur if:\n- The requested time slot is not available\n- The event type doesn't exist\n- Required questions are not answered\n- External validation failed"
          }
        },
        "security" : [ ],
        "summary" : "Create a new booking",
        "tags" : [ "bookings" ]
      }
    },
    "/v1/bookings/{id}" : {
      "get" : {
        "description" : "Retrieves a booking by its unique identifier.\n\nBookings in TimeTime represent scheduled appointments or reservations created through event types.\nEach booking includes information about:\n- The event type (appointment type, service, etc.)\n- Scheduled time and duration\n- Booker information\n- Answers to custom questions (if any were configured)\n- Status (confirmed, canceled, pending)\n- Associated resources\n- Location details\n\nThis endpoint can be accessed without authentication and is intended for public access to booking details,\nmaking it suitable for sharing booking information with end users who may not have TimeTime accounts.\nIt returns a public representation of the booking with limited details appropriate for the booker.",
        "operationId" : "getBooking",
        "parameters" : [ {
          "description" : "The unique identifier of the booking to retrieve",
          "example" : "123e4567-e89b-12d3-a456-426614174000",
          "in" : "path",
          "name" : "id",
          "required" : true,
          "schema" : {
            "type" : "string",
            "format" : "uuid"
          }
        } ],
        "responses" : {
          "200" : {
            "content" : {
              "application/json" : {
                "schema" : {
                  "$ref" : "#/components/schemas/PublicBooking"
                }
              }
            },
            "description" : "The booking was found and returned successfully. The response contains the booking details\nincluding event type information, scheduled time, booker details, and status. Sensitive information\nand internal configuration details are not exposed through this endpoint."
          },
          "404" : {
            "content" : {
              "application/json" : {
                "schema" : {
                  "$ref" : "#/components/schemas/PublicBooking"
                }
              }
            },
            "description" : "Not Found - No booking exists with the specified ID, or the booking is not publicly accessible."
          }
        },
        "security" : [ ],
        "summary" : "Get a booking by ID",
        "tags" : [ "bookings" ]
      },
      "patch" : {
        "description" : "Updates specific fields of an existing booking.\n\nThis endpoint allows authorized users to modify certain properties of a booking after it has been created.\nCurrently, it supports updating private notes associated with the booking. Private notes are visible only to\nthe booking owner and organization administrators.\n\nThe update operation is partial, meaning only the fields included in the request will be modified.\nFields not included in the request will remain unchanged.",
        "operationId" : "updateBooking",
        "parameters" : [ {
          "description" : "The unique identifier of the booking to update",
          "in" : "path",
          "name" : "id",
          "required" : true,
          "schema" : {
            "type" : "string",
            "format" : "uuid"
          }
        } ],
        "requestBody" : {
          "content" : {
            "application/json" : {
              "schema" : {
                "$ref" : "#/components/schemas/PatchBookingBody"
              }
            }
          },
          "required" : true
        },
        "responses" : {
          "204" : {
            "content" : { },
            "description" : "The booking was successfully updated. No content is returned in the response body."
          },
          "403" : {
            "content" : { },
            "description" : "Forbidden - The authenticated user does not have permission to update this booking."
          },
          "404" : {
            "content" : { },
            "description" : "Not Found - No booking exists with the specified ID."
          }
        },
        "summary" : "Update a booking",
        "tags" : [ "bookings" ]
      }
    },
    "/v1/bookings/{id}/cancellation" : {
      "post" : {
        "description" : "Cancels an existing booking. This endpoint can be accessed without authentication and is primarily used by bookers to cancel their appointments.",
        "operationId" : "cancelBooking",
        "parameters" : [ {
          "description" : "The unique identifier of the booking to cancel",
          "in" : "path",
          "name" : "id",
          "required" : true,
          "schema" : {
            "type" : "string",
            "format" : "uuid"
          }
        } ],
        "requestBody" : {
          "content" : {
            "application/json" : {
              "schema" : {
                "$ref" : "#/components/schemas/CancelBookingRequest"
              }
            }
          }
        },
        "responses" : {
          "201" : {
            "content" : { },
            "description" : "The booking was cancelled successfully"
          },
          "404" : {
            "content" : {
              "application/json" : {
                "schema" : {
                  "$ref" : "#/components/schemas/ProblemDetail"
                }
              }
            },
            "description" : "The booking with the provided ID was not found"
          },
          "409" : {
            "content" : {
              "application/json" : {
                "schema" : {
                  "$ref" : "#/components/schemas/ProblemDetail"
                }
              }
            },
            "description" : "The booking is already cancelled by someone else or with a different reason"
          }
        },
        "security" : [ ],
        "summary" : "Cancel a booking",
        "tags" : [ "bookings" ]
      }
    },
    "/v1/bookings/{id}/confirmed-holds" : {
      "post" : {
        "description" : "Transitions a booking from a held state to a confirmed state.\n\nIn TimeTime, bookings can exist in different states, including 'held' and 'confirmed'. A held booking\nis a temporary reservation that has not yet been finalized. This endpoint allows authorized users to\nconfirm a held booking, making it a permanent reservation.\n\nThis operation is typically used in workflows where bookings are initially created in a held state\n(for example, during a multi-step booking process or when pending approval) and then later confirmed\nwhen certain conditions are met or approvals are received.\n\nOnly users with appropriate permissions can confirm a booking, such as the booking owner, event type owner,\nor organization administrators.",
        "operationId" : "confirm",
        "parameters" : [ {
          "description" : "The unique identifier of the booking to confirm",
          "in" : "path",
          "name" : "id",
          "required" : true,
          "schema" : {
            "type" : "string",
            "format" : "uuid"
          }
        } ],
        "responses" : {
          "200" : {
            "content" : {
              "application/json" : {
                "schema" : {
                  "$ref" : "#/components/schemas/PublicBooking"
                }
              }
            },
            "description" : "The booking has been confirmed."
          },
          "403" : {
            "content" : {
              "application/json" : {
                "schema" : {
                  "$ref" : "#/components/schemas/ProblemDetail"
                }
              }
            },
            "description" : "The booking can't be managed by the current user."
          },
          "409" : {
            "content" : {
              "application/json" : {
                "schema" : {
                  "$ref" : "#/components/schemas/ProblemDetail"
                }
              }
            },
            "description" : "The booking is canceled, can't confirm this hold."
          }
        },
        "summary" : "Confirms a held booking",
        "tags" : [ "bookings" ]
      }
    },
    "/v1/calendar-event-invitations/{id}" : {
      "get" : {
        "description" : "Retrieves the details of a specific calendar event invitation.\n\nCalendar event invitations in TimeTime are sent to users when they are invited to participate in a calendar event.\nThis endpoint allows retrieving the details of a specific invitation, including information about the event,\nthe inviter, and the current status of the invitation.\n\nThis endpoint is publicly accessible without authentication, allowing invited users to view their invitation\ndetails even if they don't have a TimeTime account yet. The invitation ID is typically shared via email or\nother communication channels.",
        "operationId" : "getCalendarEventInvitation",
        "parameters" : [ {
          "description" : "The unique identifier of the calendar event invitation to retrieve",
          "in" : "path",
          "name" : "id",
          "required" : true,
          "schema" : {
            "type" : "string",
            "format" : "uuid"
          }
        } ],
        "responses" : {
          "200" : {
            "content" : {
              "application/json" : {
                "schema" : {
                  "$ref" : "#/components/schemas/CalendarEventInvitation"
                }
              }
            },
            "description" : "The requested calendar event invitation."
          },
          "404" : {
            "content" : {
              "application/json" : {
                "schema" : {
                  "$ref" : "#/components/schemas/ProblemDetail"
                }
              }
            },
            "description" : "The calendar event invitation does not exist."
          }
        },
        "security" : [ ],
        "summary" : "Get a calendar event invitation",
        "tags" : [ "calendars" ]
      }
    },
    "/v1/calendar-event-invitations/{invitationId}/replies" : {
      "post" : {
        "description" : "Allows an invitee to accept or decline a calendar event invitation.\n\nWhen a user is invited to a calendar event in TimeTime, they receive an invitation that requires a response.\nThis endpoint enables the invitee to submit their response (accept or decline) to the invitation.\n\nThe response can include an optional comment providing additional context about the decision.\nThis endpoint is publicly accessible without authentication, allowing invited users to respond to invitations\neven if they don't have a TimeTime account.\n\nThe invitation ID is typically shared via email or other communication channels, and the response status\nwill be reflected in the calendar event's attendee list.",
        "operationId" : "postInvitationReply",
        "parameters" : [ {
          "description" : "The unique identifier of the calendar event invitation to respond to",
          "in" : "path",
          "name" : "invitationId",
          "required" : true,
          "schema" : {
            "type" : "string",
            "format" : "uuid"
          }
        } ],
        "requestBody" : {
          "content" : {
            "application/json" : {
              "schema" : {
                "$ref" : "#/components/schemas/EventInvitationReply"
              }
            }
          },
          "required" : true
        },
        "responses" : {
          "204" : {
            "content" : {
              "application/json" : { }
            },
            "description" : "The invitation reply has been stored successfully."
          },
          "400" : {
            "content" : {
              "application/json" : {
                "schema" : {
                  "$ref" : "#/components/schemas/ProblemDetail"
                }
              }
            },
            "description" : "Some field is not valid."
          },
          "404" : {
            "content" : {
              "application/json" : {
                "schema" : {
                  "$ref" : "#/components/schemas/ProblemDetail"
                }
              }
            },
            "description" : "The invitation was not found."
          }
        },
        "security" : [ ],
        "summary" : "Respond to a calendar event invitation",
        "tags" : [ "calendars" ]
      }
    },
    "/v1/calendar-events" : {
      "get" : {
        "description" : "Retrieves a list of calendar events from specified calendars within a given time range.\n\nThis endpoint allows users to fetch events from one or more calendars they have access to. Events can be filtered\nby a specific time range (required) and optionally include events without a defined time interval.\n\nCalendar events in TimeTime represent scheduled activities, appointments, or blocks of time. They can be associated\nwith bookings, manually created by users, or synchronized from external calendar systems.\n\nThe response includes event details such as title, description, start and end times, location, attendees,\nand other relevant information.",
        "operationId" : "listCalendarEvents",
        "parameters" : [ {
          "description" : "Comma separated list of calendar IDs to fetch events from. If empty, events from all calendars accessible to the user will be returned.",
          "example" : "123e4567-e89b-12d3-a456-426614174000,123e4567-e89b-12d3-a456-426614174001",
          "in" : "query",
          "name" : "calendarIds",
          "required" : false,
          "schema" : {
            "type" : "array",
            "items" : {
              "type" : "string",
              "format" : "uuid"
            },
            "uniqueItems" : true
          }
        }, {
          "description" : "Start time of the interval to fetch events from (inclusive). Must be in ISO-8601 format.",
          "example" : "2023-01-01T00:00:00Z",
          "in" : "query",
          "name" : "timeMin",
          "required" : true,
          "schema" : {
            "type" : "string",
            "format" : "date-time"
          }
        }, {
          "description" : "End time of the interval to fetch events from (inclusive). Must be in ISO-8601 format and greater than timeMin.",
          "example" : "2023-01-31T23:59:59Z",
          "in" : "query",
          "name" : "timeMax",
          "required" : true,
          "schema" : {
            "type" : "string",
            "format" : "date-time"
          }
        }, {
          "description" : "Whether to include events that don't have a defined time interval. This is useful for all-day events or events without a specific time.",
          "example" : false,
          "in" : "query",
          "name" : "includeEventsWithoutInterval",
          "required" : false,
          "schema" : {
            "type" : "boolean"
          }
        } ],
        "responses" : {
          "200" : {
            "content" : {
              "application/json" : {
                "schema" : {
                  "$ref" : "#/components/schemas/CalendarEventsList"
                }
              }
            },
            "description" : "The list of the calendar events."
          },
          "400" : {
            "content" : {
              "application/json" : {
                "schema" : {
                  "$ref" : "#/components/schemas/ProblemDetail"
                }
              }
            },
            "description" : "Some field is not valid."
          },
          "403" : {
            "content" : {
              "application/json" : {
                "schema" : {
                  "$ref" : "#/components/schemas/ProblemDetail"
                }
              }
            },
            "description" : "The authenticated user can't access to some of the requested calendars."
          }
        },
        "summary" : "List calendar events",
        "tags" : [ "calendars" ]
      }
    },
    "/v1/calendar-events/{eventId}" : {
      "delete" : {
        "description" : "Permanently removes a calendar event from the system.\n\nThis endpoint allows users to delete calendar events they have created or have permission to manage.\nOnce deleted, the event will no longer appear in calendar views or event listings, and any associated\nnotifications or reminders will be canceled.\n\nUsers can only delete events they have permission to manage, such as:\n- Events they created\n- Events in calendars they own\n- Events in calendars where they have admin or write permissions\n\nThis operation cannot be undone, so it should be used with caution.",
        "operationId" : "deleteCalendarEvent",
        "parameters" : [ {
          "description" : "The unique identifier of the calendar event to delete",
          "example" : "123e4567-e89b-12d3-a456-426614174000",
          "in" : "path",
          "name" : "eventId",
          "required" : true,
          "schema" : {
            "type" : "string",
            "format" : "uuid"
          }
        } ],
        "responses" : {
          "204" : {
            "content" : {
              "application/json" : { }
            },
            "description" : "The event has been deleted successfully."
          },
          "403" : {
            "content" : {
              "application/json" : {
                "schema" : {
                  "$ref" : "#/components/schemas/ProblemDetail"
                }
              }
            },
            "description" : "The authenticated user can't delete this event."
          }
        },
        "summary" : "Delete a calendar event",
        "tags" : [ "calendars" ]
      },
      "get" : {
        "description" : "Retrieves detailed information about a specific calendar event identified by its unique ID.\n\nCalendar events in TimeTime represent scheduled activities, appointments, or blocks of time. They can be:\n- Manually created events in a user's calendar\n- Bookings created through event types\n- Events synchronized from external calendar systems\n- Recurring events with multiple instances\n\nEach calendar event includes information about:\n- Title and description\n- Start and end times\n- Location (physical or virtual)\n- Attendees and their response status\n- Recurrence rules (for recurring events)\n- Reminders and notifications\n\nThis endpoint requires authentication and will only return events from calendars that the authenticated user\nhas permission to access. The response includes the event's complete details including metadata, timing,\nattendees, locations, and other properties.",
        "operationId" : "getCalendarEvent",
        "parameters" : [ {
          "description" : "The unique identifier of the calendar event to retrieve",
          "example" : "123e4567-e89b-12d3-a456-426614174000",
          "in" : "path",
          "name" : "eventId",
          "required" : true,
          "schema" : {
            "type" : "string",
            "format" : "uuid"
          }
        } ],
        "responses" : {
          "200" : {
            "content" : {
              "application/json" : {
                "schema" : {
                  "$ref" : "#/components/schemas/CalendarEvent"
                }
              }
            },
            "description" : "The calendar event was successfully retrieved"
          },
          "403" : {
            "content" : {
              "application/json" : {
                "schema" : {
                  "$ref" : "#/components/schemas/ProblemDetail"
                }
              }
            },
            "description" : "The authenticated user does not have permission to access this calendar event"
          },
          "404" : {
            "content" : {
              "application/json" : {
                "schema" : {
                  "$ref" : "#/components/schemas/ProblemDetail"
                }
              }
            },
            "description" : "No calendar event was found with the specified ID"
          }
        },
        "summary" : "Get a calendar event by ID",
        "tags" : [ "calendars" ]
      },
      "put" : {
        "operationId" : "putCalendarEvent",
        "parameters" : [ {
          "in" : "path",
          "name" : "eventId",
          "required" : true,
          "schema" : {
            "type" : "string",
            "format" : "uuid"
          }
        } ],
        "requestBody" : {
          "content" : {
            "application/json" : {
              "schema" : {
                "$ref" : "#/components/schemas/PutCalendarEventRequest"
              }
            }
          },
          "required" : true
        },
        "responses" : {
          "200" : {
            "content" : {
              "application/json" : {
                "schema" : {
                  "$ref" : "#/components/schemas/CalendarEvent"
                }
              }
            },
            "description" : "The event has been created or updated successfully."
          },
          "400" : {
            "content" : {
              "application/json" : {
                "schema" : {
                  "$ref" : "#/components/schemas/ProblemDetail"
                }
              }
            },
            "description" : "Some field is not valid."
          },
          "403" : {
            "content" : {
              "application/json" : {
                "schema" : {
                  "$ref" : "#/components/schemas/ProblemDetail"
                }
              }
            },
            "description" : "The authenticated user can't modify this user."
          },
          "404" : {
            "content" : {
              "application/json" : {
                "schema" : {
                  "$ref" : "#/components/schemas/ProblemDetail"
                }
              }
            },
            "description" : "The calendar does not exist."
          }
        },
        "summary" : "Creates or updates a calendar event.",
        "tags" : [ "calendars" ]
      }
    },
    "/v1/calendars" : {
      "get" : {
        "description" : "Retrieves a list of all calendars that the authenticated user has access to.\n\nCalendars in TimeTime represent scheduling entities that can contain events and appointments. This endpoint returns:\n- Personal calendars owned by the authenticated user\n- Shared calendars the user has been granted access to\n- Team calendars from organizations the user belongs to\n- Resource calendars the user has permission to view\n- Connected third-party calendars (Google Calendar, Microsoft Outlook, etc.)\n\nEach calendar in the response includes details such as:\n- Calendar ID and name\n- Owner information\n- Access permissions\n- Integration status (for third-party calendars)\n- Color and display preferences\n- Sharing settings\n\nThis endpoint is commonly used to populate calendar selection interfaces, allowing users to choose\nwhich calendars to display or use for availability checking.",
        "operationId" : "listCalendars",
        "responses" : {
          "200" : {
            "content" : {
              "application/json" : {
                "schema" : {
                  "$ref" : "#/components/schemas/CalendarsList"
                }
              }
            },
            "description" : "The list of accessible calendars was successfully retrieved"
          },
          "401" : {
            "content" : {
              "application/json" : {
                "schema" : {
                  "$ref" : "#/components/schemas/CalendarsList"
                }
              }
            },
            "description" : "Authentication is required to access this endpoint"
          }
        },
        "summary" : "List accessible calendars",
        "tags" : [ "calendars" ]
      }
    },
    "/v1/calendars/{calendarId}" : {
      "delete" : {
        "description" : "Permanently deletes a calendar by its unique identifier, along with all associated events.\n\nThis endpoint supports deleting both regular TimeTime calendars (identified by UUID) and third-party\nconnected calendars (identified by a special format string). The system automatically determines the\ncalendar type based on the provided ID format.\n\nCalendars in TimeTime serve several important purposes:\n- Storing and organizing events and appointments\n- Managing availability for scheduling\n- Synchronizing with external calendar systems\n- Coordinating schedules across teams and resources\n\nDeleting a calendar is a permanent operation that cannot be undone. When a calendar is deleted:\n- All events in the calendar are permanently removed\n- All sharing permissions and access settings are deleted\n- Any event type availability rules referencing this calendar are affected\n- For third-party calendars, only the connection is removed (the original calendar in the external system remains intact)\n\nOnly calendar owners or users with appropriate administrative permissions can delete a calendar.\nRegular users cannot delete calendars they only have view or edit access to.",
        "operationId" : "deleteCalendar",
        "parameters" : [ {
          "description" : "The unique identifier of the calendar to delete.\n            This can be either a UUID (for regular calendars) or a special format string (for third-party calendars).",
          "example" : "123e4567-e89b-12d3-a456-426614174000",
          "in" : "path",
          "name" : "calendarId",
          "required" : true,
          "schema" : {
            "type" : "string"
          }
        } ],
        "responses" : {
          "204" : {
            "content" : {
              "application/json" : {
                "schema" : {
                  "type" : "object"
                }
              }
            },
            "description" : "The calendar was successfully deleted"
          },
          "403" : {
            "content" : {
              "application/json" : {
                "schema" : {
                  "$ref" : "#/components/schemas/ProblemDetail"
                }
              }
            },
            "description" : "The authenticated user does not have permission to delete this calendar"
          },
          "404" : {
            "content" : {
              "application/json" : {
                "schema" : {
                  "$ref" : "#/components/schemas/ProblemDetail"
                }
              }
            },
            "description" : "The calendar with the specified ID was not found"
          }
        },
        "summary" : "Delete a calendar",
        "tags" : [ "calendars" ]
      },
      "get" : {
        "description" : "Retrieves detailed information about a specific calendar identified by its unique ID.\n\nCalendars in TimeTime represent scheduling entities that can contain events and appointments. They can be:\n- Personal calendars for individual users\n- Shared team calendars for organizations\n- Resource calendars linked to bookable resources\n\nCalendars serve as the foundation for TimeTime's scheduling capability, allowing for availability management,\nevent creation, and coordination across individuals, teams, and resources.\n\nThis endpoint requires authentication and will only return calendars that the authenticated user has permission to access.\nThe response includes the calendar's metadata, sharing settings, and other properties.",
        "operationId" : "getCalendar",
        "parameters" : [ {
          "description" : "The unique identifier of the calendar to retrieve",
          "example" : "123e4567-e89b-12d3-a456-426614174000",
          "in" : "path",
          "name" : "calendarId",
          "required" : true,
          "schema" : {
            "type" : "string",
            "format" : "uuid"
          }
        } ],
        "responses" : {
          "200" : {
            "content" : {
              "application/json" : {
                "schema" : {
                  "$ref" : "#/components/schemas/Calendar"
                }
              }
            },
            "description" : "The calendar was successfully retrieved. The response contains complete calendar configuration."
          },
          "403" : {
            "content" : {
              "application/json" : {
                "schema" : {
                  "$ref" : "#/components/schemas/ProblemDetail"
                }
              }
            },
            "description" : "Forbidden - The authenticated user does not have permission to access this calendar"
          },
          "404" : {
            "content" : {
              "application/json" : {
                "schema" : {
                  "$ref" : "#/components/schemas/ProblemDetail"
                }
              }
            },
            "description" : "Not Found - No calendar exists with the specified ID"
          }
        },
        "summary" : "Get a calendar by ID",
        "tags" : [ "calendars" ]
      },
      "put" : {
        "description" : "Creates a new calendar or updates an existing one with the provided configuration.\n\nThis endpoint follows REST conventions where PUT is used for idempotent create/update operations.\nIf the calendar with the specified ID doesn't exist, a new calendar will be created.\nIf it does exist, the existing calendar will be updated with the provided configuration.\n\nCalendars in TimeTime are fundamental scheduling entities that:\n- Store and organize events and appointments\n- Define availability for scheduling\n- Can be shared with other users or organizations\n- Can be connected to external calendar systems\n\nWhen creating or updating a calendar, you can configure:\n- Calendar name and description\n- Color for visual identification\n- Visibility and sharing settings\n- Default notification preferences\n- Integration settings for third-party calendars\n\nOnly the calendar owner or users with appropriate permissions can create or modify calendars.\nWhen creating a new calendar, the authenticated user becomes the owner by default.",
        "operationId" : "putCalendar",
        "parameters" : [ {
          "description" : "The unique identifier of the calendar to create or update",
          "example" : "123e4567-e89b-12d3-a456-426614174000",
          "in" : "path",
          "name" : "calendarId",
          "required" : true,
          "schema" : {
            "type" : "string",
            "format" : "uuid"
          }
        } ],
        "requestBody" : {
          "content" : {
            "application/json" : {
              "schema" : {
                "$ref" : "#/components/schemas/PutCalendar"
              }
            }
          },
          "required" : true
        },
        "responses" : {
          "204" : {
            "content" : {
              "application/json" : { }
            },
            "description" : "The calendar has been created or updated successfully."
          },
          "400" : {
            "content" : {
              "application/json" : {
                "schema" : {
                  "$ref" : "#/components/schemas/ProblemDetail"
                }
              }
            },
            "description" : "Some field is not valid."
          },
          "403" : {
            "content" : {
              "application/json" : {
                "schema" : {
                  "$ref" : "#/components/schemas/ProblemDetail"
                }
              }
            },
            "description" : "The authenticated user can't modify this calendar."
          }
        },
        "summary" : "Create or update a calendar",
        "tags" : [ "calendars" ]
      }
    },
    "/v1/consent" : {
      "post" : {
        "operationId" : "postThirdPartyConsent",
        "requestBody" : {
          "content" : {
            "application/json" : {
              "schema" : {
                "$ref" : "#/components/schemas/ThirdPartyConsentBody"
              }
            }
          },
          "required" : true
        },
        "responses" : {
          "204" : {
            "content" : { },
            "description" : "No Content"
          }
        },
        "tags" : [ "users" ]
      }
    },
    "/v1/event-types" : {
      "get" : {
        "description" : "Retrieves a list of all event types that the authenticated user has access to.\n\nEvent types in TimeTime are configurable appointment or booking templates that define how scheduling works.\nThey represent different kinds of bookable services or appointments, such as:\n- Consultation sessions\n- Meetings\n- Classes or training sessions\n- Equipment rentals\n- Facility reservations\n\nThis endpoint returns event types owned by the authenticated user or shared with them as a collaborator.\nIf the optional ownerId parameter is provided, it returns event types owned by the specified user that\nthe authenticated user has access to view.\n\nThe response includes basic information about each event type, including its name, description, and identifiers.\nFor complete event type details, use the Get Event Type endpoint with the specific event type ID.",
        "operationId" : "listEventTypesByOwnerId",
        "parameters" : [ {
          "in" : "query",
          "name" : "ownerId",
          "required" : false,
          "schema" : {
            "type" : "string",
            "format" : "uuid"
          }
        } ],
        "responses" : {
          "200" : {
            "content" : {
              "application/json" : {
                "schema" : {
                  "$ref" : "#/components/schemas/EventTypesList"
                }
              }
            },
            "description" : "Successfully retrieved the list of event types. Returns an empty collection if no event types are accessible or if the specified owner has no event types visible to the authenticated user."
          },
          "403" : {
            "content" : {
              "application/json" : {
                "schema" : {
                  "$ref" : "#/components/schemas/EventTypesList"
                }
              }
            },
            "description" : "Forbidden - The authenticated user does not have permission to view event types owned by the specified user."
          }
        },
        "summary" : "List all accessible event types",
        "tags" : [ "event-types" ]
      }
    },
    "/v1/event-types/{id}" : {
      "delete" : {
        "description" : "Permanently deletes an event type by its unique identifier.\nOnly event type owners can delete an event type. Once deleted, the event type will no longer be available for booking\nand all references to it will be removed from the system. This action cannot be undone.\n\nDeleting an event type will also remove any associated bookings, workflows, or configurations linked to it.\nThis endpoint should be used with caution as it will impact any integrations or links that reference this event type.",
        "operationId" : "delete",
        "parameters" : [ {
          "in" : "path",
          "name" : "id",
          "required" : true,
          "schema" : {
            "type" : "string",
            "format" : "uuid"
          }
        } ],
        "responses" : {
          "204" : {
            "content" : { },
            "description" : "The event type was successfully deleted."
          },
          "403" : {
            "content" : { },
            "description" : "Forbidden - The authenticated user does not have permission to delete this event type. Only the event type owner can delete it."
          },
          "404" : {
            "content" : { },
            "description" : "Not Found - The event type with the specified ID was not found."
          }
        },
        "summary" : "Delete an event type",
        "tags" : [ "event-types" ]
      },
      "get" : {
        "description" : "Retrieves the complete details of an event type identified by its unique ID.\n\nEvent types in TimeTime are configurable appointment or booking templates that define how scheduling works.\nThey represent different kinds of bookable services or appointments, such as:\n- Consultation sessions\n- Meetings\n- Classes or training sessions\n- Equipment rentals\n- Facility reservations\n\nEach event type includes settings for:\n- Duration and scheduling step intervals\n- Availability windows and booking constraints\n- Resource requirements\n- Notification preferences\n- Custom booking questions\n- Calendar integration settings\n\nEvent types are the cornerstone of TimeTime's scheduling capability, allowing organizations to define\ndifferent kinds of appointments with unique rules, durations, and booking workflows.\n\nThis endpoint returns all configuration settings, availability rules, and associated resources for the specified event type.\nThe authenticated user must have permission to access the event type, either as its owner or as a collaborator.",
        "operationId" : "getEventType",
        "parameters" : [ {
          "description" : "The unique identifier of the event type to retrieve",
          "example" : "123e4567-e89b-12d3-a456-426614174000",
          "in" : "path",
          "name" : "id",
          "required" : true,
          "schema" : {
            "type" : "string",
            "format" : "uuid"
          }
        } ],
        "responses" : {
          "200" : {
            "content" : {
              "application/json" : {
                "schema" : {
                  "$ref" : "#/components/schemas/EventType"
                }
              }
            },
            "description" : "The event type was successfully retrieved. The response contains the complete event type configuration including name, duration, availability settings, notification configurations, and all other associated data."
          },
          "403" : {
            "content" : {
              "application/json" : {
                "schema" : {
                  "$ref" : "#/components/schemas/ProblemDetail"
                }
              }
            },
            "description" : "Forbidden - The authenticated user does not have permission to access this event type. This occurs when the user is neither the owner nor a collaborator on the event type."
          },
          "404" : {
            "content" : {
              "application/json" : {
                "schema" : {
                  "$ref" : "#/components/schemas/ProblemDetail"
                }
              }
            },
            "description" : "Not Found - No event type exists with the specified ID. This may occur if the event type has been deleted or if the ID is invalid."
          }
        },
        "summary" : "Get a specific event type by ID",
        "tags" : [ "event-types" ]
      },
      "put" : {
        "description" : "Creates a new event type or updates an existing one with the specified ID. If the event type doesn't exist, it will be created; otherwise, the existing event type will be updated with the provided configuration. This endpoint allows for comprehensive configuration of all event type settings including availability patterns, booking rules, notifications, and integrations. The authenticated user must have permission to create or modify the event type.",
        "operationId" : "putEventType",
        "parameters" : [ {
          "in" : "path",
          "name" : "id",
          "required" : true,
          "schema" : {
            "type" : "string",
            "format" : "uuid"
          }
        } ],
        "requestBody" : {
          "content" : {
            "application/json" : {
              "schema" : {
                "$ref" : "#/components/schemas/PutEventTypeModel"
              }
            }
          },
          "required" : true
        },
        "responses" : {
          "204" : {
            "content" : {
              "application/json" : {
                "schema" : {
                  "type" : "object"
                }
              }
            },
            "description" : "The event type was successfully created or updated. No content is returned in the response body."
          },
          "400" : {
            "content" : {
              "application/json" : {
                "schema" : {
                  "$ref" : "#/components/schemas/ProblemDetail"
                }
              }
            },
            "description" : "Bad Request - The request contains invalid parameters or validation errors. This can occur if required fields are missing or if values don't meet validation requirements."
          },
          "403" : {
            "content" : {
              "application/json" : {
                "schema" : {
                  "$ref" : "#/components/schemas/ProblemDetail"
                }
              }
            },
            "description" : "Forbidden - The authenticated user does not have permission to create or update this event type. This occurs when attempting to modify an event type owned by another user without proper access rights."
          },
          "409" : {
            "content" : {
              "application/json" : {
                "schema" : {
                  "$ref" : "#/components/schemas/ProblemDetail"
                }
              }
            },
            "description" : "Conflict - The specified slug is already in use by another event type owned by this user. Slugs must be unique within a user's event types."
          }
        },
        "summary" : "Create or update an event type",
        "tags" : [ "event-types" ]
      }
    },
    "/v1/event-types/{id}/availability" : {
      "get" : {
        "description" : "Retrieves the available time slots for booking a specific event type within a given date range.\n\nThis endpoint is designed for public access and does not require authentication, making it suitable for embedding in public booking pages.\nIt provides all the information needed to display available time slots and collect booking information from users.\n\nThe availability calculation takes into account:\n- The event type's configured schedule and availability windows\n- Existing bookings for the event type\n- Resource availability if the event type uses resources\n- Buffer times before and after events\n- Minimum notice period requirements\n\nThe response includes not only the available time slots but also all the necessary information about the event type,\nincluding questions that need to be answered during booking, pricing information if applicable, and internationalization details.",
        "operationId" : "getEventTypeAvailability",
        "parameters" : [ {
          "description" : "\nThe event type identifier. This endpoint admits 2 different ways for identifying the event type:\n\n1. The event type `UUID` (the same used when creating the event type).\n2. The combination of the event owner slug + the event type slug, concatenated by ':', example:\n`GET /v1/event-types/event-owner-slug:event-type-slug/availability`\n            ",
          "in" : "path",
          "name" : "id",
          "required" : true,
          "schema" : {
            "type" : "string"
          }
        }, {
          "description" : "\nThe starting date to get the availability in ISO-8601 format, example: `2021-01-01`.\n\nIf the parameter is not provided, the current day in the UTC time zone is used.\n            ",
          "in" : "query",
          "name" : "from",
          "required" : false,
          "schema" : {
            "type" : "string",
            "format" : "date"
          }
        }, {
          "description" : "\nStarting from the 'from' value, this sets the limit day to verify the event availability.\n\nMinimum allowed is `1`, and maximum is `14`.\n            ",
          "in" : "query",
          "name" : "days",
          "required" : false,
          "schema" : {
            "type" : "integer",
            "format" : "int64",
            "default" : 7,
            "maximum" : 43,
            "minimum" : 1
          }
        }, {
          "description" : "\nFor bookings with multiple units (e.g. a party booking a table in a restaurant) this is the parameter\nthat specifies how many units need to be available to consider each time slot free and therefore bookable.\n\nOnly positive values are allowed.\n            ",
          "in" : "query",
          "name" : "units",
          "required" : false,
          "schema" : {
            "type" : "integer",
            "format" : "int32",
            "default" : 1,
            "minimum" : 1
          }
        }, {
          "description" : "\nThe TimeZone id (IANA) to be used in combination with the \"from\" parameter to calculate the availability.\n            ",
          "in" : "query",
          "name" : "timeZone",
          "required" : false,
          "schema" : {
            "type" : "string",
            "default" : "GMT"
          }
        }, {
          "description" : "\nEvent types can have i18n configuration for some fields, such `name`, `description`,\nquestions `label` field...'\nThe `locale` query param can be used to ask for the event type translated into that language if\navailable.\nIf the event type has not been configured with translations for the queried language, the default values\nwill be used.\n            ",
          "in" : "query",
          "name" : "locale"
        } ],
        "responses" : {
          "200" : {
            "content" : {
              "application/json" : {
                "schema" : {
                  "$ref" : "#/components/schemas/EventTypeAvailabilityModel"
                }
              }
            },
            "description" : "Successful response with the event type availability information. The response includes:\n- Basic event type details (id, name, description)\n- Available time slots with start and end times\n- Scoring information for each time slot to indicate preference\n- Pricing information if applicable\n- Questions that need to be answered during booking\n- Resource availability information (units, concurrent bookings)\n- Internationalization details\n- Redirect configuration for after booking completion"
          },
          "400" : {
            "content" : {
              "application/json" : {
                "schema" : {
                  "$ref" : "#/components/schemas/ProblemDetail"
                }
              }
            },
            "description" : "Bad Request - The request contains invalid parameters. This can occur if:\n- The event type identifier format is invalid\n- The 'days' parameter is outside the allowed range (1-43)\n- The 'units' parameter is less than 1\n- The 'timeZone' parameter is not a valid IANA timezone identifier"
          },
          "404" : {
            "content" : {
              "application/json" : {
                "schema" : {
                  "type" : "object"
                }
              }
            },
            "description" : "The event type doesn't exist or is not publicly available. This can occur if:\n- The event type ID or slug combination is invalid\n- The event type has been deleted\n- The event type is not published or is set to private visibility"
          }
        },
        "security" : [ ],
        "summary" : "Get event type availability",
        "tags" : [ "event-types" ]
      }
    },
    "/v1/external-booking-validation-example" : {
      "post" : {
        "description" : "This endpoint serves as an example of how to implement external booking validation in TimeTime.\n\nWhen integrated with external systems, TimeTime can validate bookings against those systems before confirming them.\nThis sample controller demonstrates the expected request format and response patterns for external validation.\n\nIn a real implementation, this endpoint would communicate with your external system to check if the booking\ncan be made based on your business rules and constraints.",
        "operationId" : "externalValidationExample",
        "requestBody" : {
          "content" : {
            "application/json" : {
              "schema" : {
                "$ref" : "#/components/schemas/ExternalBookingValidationModel"
              }
            }
          },
          "required" : true
        },
        "responses" : {
          "204" : {
            "content" : {
              "application/json" : {
                "schema" : {
                  "type" : "object"
                }
              }
            },
            "description" : "Booking has been validated successfully, so TimeTime can proceed."
          },
          "400" : {
            "content" : {
              "application/json" : {
                "schema" : {
                  "$ref" : "#/components/schemas/ProblemDetail"
                }
              }
            },
            "description" : "The booking is not valid for the configured external system."
          }
        },
        "security" : [ ],
        "summary" : "Validate a booking with an external system",
        "tags" : [ "bookings" ]
      }
    },
    "/v1/external-bookings/{id}" : {
      "put" : {
        "description" : "Creates or updates a booking from an external system with the specified ID.\n\nThis endpoint allows importing bookings from external systems into TimeTime. It's commonly used for:\n- Migrating bookings from legacy scheduling systems\n- Synchronizing bookings from third-party platforms\n- Creating bookings programmatically from external applications\n\nExternal bookings are associated with an event type and can include details such as:\n- Time interval for the booking\n- Booker's email address\n- Answers to event type questions\n- Notes about the booking\n- Resources being booked\n- Pricing information\n\nUnlike regular bookings created through the standard booking flow, external bookings bypass\navailability checks and other validation rules. This allows importing historical bookings\nor creating bookings in time slots that would normally be unavailable.\n\nThe authenticated user must have permission to create bookings for the specified event type.",
        "operationId" : "createExternalBooking",
        "parameters" : [ {
          "description" : "The unique identifier to assign to the booking. If a booking with this ID already exists, it will be updated.",
          "in" : "path",
          "name" : "id",
          "required" : true,
          "schema" : {
            "type" : "string",
            "format" : "uuid"
          }
        } ],
        "requestBody" : {
          "content" : {
            "application/json" : {
              "schema" : {
                "$ref" : "#/components/schemas/ExternalBooking"
              }
            }
          },
          "required" : true
        },
        "responses" : {
          "204" : {
            "content" : { },
            "description" : "No Content - The booking was successfully created or updated. No content is returned in the response body."
          },
          "403" : {
            "content" : { },
            "description" : "Forbidden - The authenticated user doesn't have permission to create bookings for the specified event type."
          },
          "404" : {
            "content" : { },
            "description" : "Not Found - The specified event type does not exist or the authenticated user doesn't have access to it."
          }
        },
        "summary" : "Create or update an external booking",
        "tags" : [ "bookings" ]
      }
    },
    "/v1/external-webhook-receiver-example" : {
      "post" : {
        "description" : "This endpoint serves as an example of how to implement a webhook receiver in TimeTime.\n\nWebhooks in TimeTime are used to integrate with external systems by receiving event notifications.\nThis sample controller demonstrates the expected request format and response patterns for webhook receivers.\n\nExternal systems can send event notifications to this endpoint, which will process the webhook payload\nand respond appropriately. This facilitates real-time communication between TimeTime and other platforms.",
        "operationId" : "receiveWebhook",
        "requestBody" : {
          "content" : {
            "application/json" : {
              "schema" : {
                "description" : "The webhook payload containing event data from the external system. This includes information about the event type, event data, and any additional metadata needed for processing.",
                "oneOf" : [ {
                  "$ref" : "#/components/schemas/BookingChanged"
                }, {
                  "$ref" : "#/components/schemas/CalendarEventChanged"
                }, {
                  "$ref" : "#/components/schemas/UpcomingBooking"
                } ]
              }
            }
          },
          "required" : true
        },
        "responses" : {
          "202" : {
            "content" : {
              "application/json" : {
                "schema" : {
                  "type" : "object"
                }
              }
            },
            "description" : "The webhook processing job was scheduled successfully."
          },
          "204" : {
            "content" : {
              "application/json" : {
                "schema" : {
                  "type" : "object"
                }
              }
            },
            "description" : "The webhook was processed successfully."
          }
        },
        "summary" : "Sample endpoint to receive external webhooks",
        "tags" : [ "webhooks" ]
      }
    },
    "/v1/google-consent" : {
      "post" : {
        "operationId" : "postGoogleConsent",
        "parameters" : [ {
          "in" : "header",
          "name" : "Origin",
          "required" : false,
          "schema" : {
            "type" : "string"
          }
        } ],
        "requestBody" : {
          "content" : {
            "application/json" : {
              "schema" : {
                "$ref" : "#/components/schemas/GoogleConsentBody"
              }
            }
          },
          "required" : true
        },
        "responses" : {
          "204" : {
            "content" : { },
            "description" : "No Content"
          }
        },
        "tags" : [ "users" ]
      }
    },
    "/v1/login" : {
      "post" : {
        "operationId" : "login",
        "parameters" : [ {
          "in" : "header",
          "name" : "Authorization",
          "required" : true,
          "schema" : {
            "type" : "string"
          }
        }, {
          "in" : "header",
          "name" : "Referer",
          "required" : false,
          "schema" : {
            "type" : "string"
          }
        }, {
          "in" : "header",
          "name" : "X-TT-Impersonated-User-Id",
          "required" : false,
          "schema" : {
            "type" : "string"
          }
        } ],
        "responses" : {
          "200" : {
            "content" : {
              "application/json" : {
                "schema" : {
                  "$ref" : "#/components/schemas/User"
                }
              }
            },
            "description" : "OK"
          }
        },
        "security" : [ ],
        "tags" : [ "users" ]
      }
    },
    "/v1/login-tokens" : {
      "post" : {
        "description" : "**ADMIN** role for the tenant is required.\n\nTimeTime is a multi-tenant service. A given user can have multiple accounts in TimeTime, but always for different tenants.\n\nWhen an admin request a login token, this operation will take the tenant of that admin and the the input, to perform the lookup.\nIf the user does not exist, it'll automatically create it.",
        "operationId" : "createLoginToken",
        "requestBody" : {
          "content" : {
            "application/json" : {
              "schema" : {
                "$ref" : "#/components/schemas/CreateLoginTokenRequest"
              }
            }
          },
          "required" : true
        },
        "responses" : {
          "201" : {
            "content" : {
              "application/json" : {
                "schema" : {
                  "$ref" : "#/components/schemas/LoginToken"
                }
              }
            },
            "description" : "The login token has been created successfully."
          },
          "400" : {
            "content" : {
              "application/json" : {
                "schema" : {
                  "$ref" : "#/components/schemas/ProblemDetail"
                }
              }
            },
            "description" : "Some field is not valid."
          },
          "403" : {
            "content" : {
              "application/json" : {
                "schema" : {
                  "$ref" : "#/components/schemas/ProblemDetail"
                }
              }
            },
            "description" : "Current user has no permissions to create a token for the requested user."
          }
        },
        "summary" : "Creates a temporary login token.",
        "tags" : [ "users" ]
      }
    },
    "/v1/me" : {
      "get" : {
        "description" : "Retrieves the profile information of the currently authenticated user.\n\nThis endpoint is a convenience method that allows users to access their own profile information\nwithout needing to know their user ID. It returns the same information as the /users/{id} endpoint,\nbut automatically uses the authenticated user's ID.\n\nThis endpoint is commonly used for:\n- Displaying the current user's profile information\n- Retrieving user preferences and settings\n- Checking the current user's permissions and roles\n- Personalizing the user interface based on user attributes\n\nThe endpoint requires authentication and will return a 403 error if called without valid credentials.",
        "operationId" : "getCurrentUser",
        "responses" : {
          "200" : {
            "content" : {
              "application/json" : {
                "schema" : {
                  "$ref" : "#/components/schemas/User"
                }
              }
            },
            "description" : "The user profile was successfully retrieved. The response contains the authenticated user's profile information including name, email, preferences, and other details."
          },
          "403" : {
            "content" : {
              "application/json" : {
                "schema" : {
                  "$ref" : "#/components/schemas/User"
                }
              }
            },
            "description" : "Forbidden - The request was not made with valid authentication credentials."
          },
          "404" : {
            "content" : {
              "application/json" : {
                "schema" : {
                  "$ref" : "#/components/schemas/User"
                }
              }
            },
            "description" : "Not Found - The authenticated user's profile could not be found (this should rarely occur)."
          }
        },
        "summary" : "Get the authenticated user's profile",
        "tags" : [ "users" ]
      }
    },
    "/v1/organizations" : {
      "get" : {
        "description" : "Retrieves a list of all organizations that the authenticated user has access to.\nThis includes organizations that the user owns and organizations where the user is a member.\n\nOrganizations in TimeTime represent business entities that can contain multiple members and shared resources.\nThey allow for team-based scheduling and resource management, with configurable roles and permissions for members.\n\nThe response includes complete configuration details for each organization, allowing clients to display organization\ninformation without additional API calls.",
        "operationId" : "listOrganizations",
        "responses" : {
          "200" : {
            "content" : {
              "application/json" : {
                "schema" : {
                  "$ref" : "#/components/schemas/OrganizationsList"
                }
              }
            },
            "description" : "Successfully retrieved the list of organizations. Returns an empty collection if the user doesn't belong to any organizations."
          }
        },
        "summary" : "List all organizations accessible to the user",
        "tags" : [ "organizations" ]
      }
    },
    "/v1/organizations/{id}" : {
      "delete" : {
        "description" : "Permanently deletes an organization by its unique identifier.\n        \nOrganizations in TimeTime are groups of users who collaborate and share resources. They serve as a way to \norganize teams, departments, or business units within a tenant. Deleting an organization is a permanent action \nthat cannot be undone.\n\nWhen an organization is deleted:\n- All members will lose access to shared resources within that organization\n- Organization-specific settings and configurations will be removed\n- Any resource allocations or permissions granted specifically to this organization will be revoked\n- Historical data related to the organization will be maintained for reporting purposes\n\nThis endpoint requires administrative privileges. Only organization owners or tenant administrators have \npermission to delete an organization. Regular members cannot delete organizations they belong to.",
        "operationId" : "deleteOrganization",
        "parameters" : [ {
          "in" : "path",
          "name" : "id",
          "required" : true,
          "schema" : {
            "type" : "string",
            "format" : "uuid"
          }
        } ],
        "responses" : {
          "204" : {
            "content" : { },
            "description" : "The organization was successfully deleted"
          },
          "403" : {
            "content" : {
              "application/json" : {
                "schema" : {
                  "$ref" : "#/components/schemas/ProblemDetail"
                }
              }
            },
            "description" : "The authenticated user does not have permission to delete this organization"
          }
        },
        "summary" : "Delete an organization",
        "tags" : [ "organizations" ]
      },
      "put" : {
        "description" : "Creates a new organization or updates an existing one with the specified ID.\nIf the organization doesn't exist, it will be created; otherwise, the existing organization will be updated with the provided configuration.\n\nOrganizations in TimeTime represent business entities that can contain multiple members and shared resources.\nThey allow for team-based scheduling and resource management, with configurable roles and permissions for members.\n\nThe authenticated user must have appropriate permissions to create or modify the organization. When creating a new organization,\nthe authenticated user will automatically become the organization owner.",
        "operationId" : "putOrganization",
        "parameters" : [ {
          "in" : "path",
          "name" : "id",
          "required" : true,
          "schema" : {
            "type" : "string",
            "format" : "uuid"
          }
        } ],
        "requestBody" : {
          "content" : {
            "application/json" : {
              "schema" : {
                "$ref" : "#/components/schemas/PutOrganization"
              }
            }
          },
          "required" : true
        },
        "responses" : {
          "204" : {
            "content" : { },
            "description" : "The organization was successfully created or updated. No content is returned in the response body."
          },
          "400" : {
            "content" : { },
            "description" : "Bad Request - The request contains invalid parameters or validation errors."
          },
          "403" : {
            "content" : { },
            "description" : "Forbidden - The authenticated user does not have permission to create or update this organization."
          }
        },
        "summary" : "Create or update an organization",
        "tags" : [ "organizations" ]
      }
    },
    "/v1/organizations/{orgId}/invitations" : {
      "post" : {
        "description" : "Sends an invitation to a user to join the specified organization.\n\nOrganizations in TimeTime are groups of users who collaborate and share resources. This endpoint allows organization\nadministrators to invite new members to join their organization. The invited user will receive an invitation that they\ncan accept to become a member of the organization.\n\nWhen inviting a member, you can specify one or more roles that will be assigned to the user upon acceptance of the\ninvitation. If no roles are specified, the default 'MEMBER' role will be assigned.\n\nThe authenticated user must have administrative privileges in the organization to send invitations.",
        "operationId" : "postOrganizationMember",
        "parameters" : [ {
          "description" : "The unique identifier of the organization to invite the member to",
          "in" : "path",
          "name" : "orgId",
          "required" : true,
          "schema" : {
            "type" : "string",
            "format" : "uuid"
          }
        } ],
        "requestBody" : {
          "content" : {
            "application/json" : {
              "schema" : {
                "$ref" : "#/components/schemas/InviteOrganizationMember"
              }
            }
          },
          "required" : true
        },
        "responses" : {
          "204" : {
            "content" : { },
            "description" : "The invitation was successfully sent. No content is returned in the response body."
          },
          "403" : {
            "content" : { },
            "description" : "Forbidden - The authenticated user does not have permission to invite members to this organization."
          },
          "404" : {
            "content" : { },
            "description" : "Not Found - Either the organization or the user to be invited does not exist."
          }
        },
        "summary" : "Invite a member to an organization",
        "tags" : [ "organizations" ]
      }
    },
    "/v1/organizations/{orgId}/members" : {
      "get" : {
        "description" : "Retrieves a list of all users who are members of the specified organization.\n\nOrganizations in TimeTime are groups of users who collaborate and share resources. Each member of an organization\nhas one or more roles that determine their permissions and access rights within the organization.\n\nThis endpoint returns details of each organization member, including:\n- User ID: The unique identifier of the user\n- Email: The email address of the user\n- Roles: The set of roles assigned to the user within the organization\n\nThe authenticated user must be a member of the organization to access this information. Organization\nadministrators can see all members, while regular members can only see basic member information based on\ntheir permission level.",
        "operationId" : "listOrganizationMembers",
        "parameters" : [ {
          "in" : "path",
          "name" : "orgId",
          "required" : true,
          "schema" : {
            "type" : "string",
            "format" : "uuid"
          }
        } ],
        "responses" : {
          "200" : {
            "content" : {
              "application/json" : {
                "schema" : {
                  "$ref" : "#/components/schemas/OrganizationMembersList"
                }
              }
            },
            "description" : "Successfully retrieved the list of organization members. Returns an empty collection if the organization has no members."
          },
          "403" : {
            "content" : {
              "application/json" : {
                "schema" : {
                  "$ref" : "#/components/schemas/OrganizationMembersList"
                }
              }
            },
            "description" : "Forbidden - The authenticated user does not have permission to view members of this organization."
          }
        },
        "summary" : "List members of an organization",
        "tags" : [ "organizations" ]
      }
    },
    "/v1/organizations/{orgId}/members/{userId}" : {
      "delete" : {
        "operationId" : "deleteOrganizationMember",
        "parameters" : [ {
          "in" : "path",
          "name" : "orgId",
          "required" : true,
          "schema" : {
            "type" : "string",
            "format" : "uuid"
          }
        }, {
          "in" : "path",
          "name" : "userId",
          "required" : true,
          "schema" : {
            "type" : "string",
            "format" : "uuid"
          }
        } ],
        "responses" : {
          "204" : {
            "content" : {
              "application/json" : {
                "schema" : {
                  "type" : "object"
                }
              }
            },
            "description" : "No Content"
          }
        },
        "tags" : [ "organizations" ]
      },
      "patch" : {
        "operationId" : "patchOrganizationMembership",
        "parameters" : [ {
          "in" : "path",
          "name" : "orgId",
          "required" : true,
          "schema" : {
            "type" : "string",
            "format" : "uuid"
          }
        }, {
          "in" : "path",
          "name" : "userId",
          "required" : true,
          "schema" : {
            "type" : "string",
            "format" : "uuid"
          }
        } ],
        "requestBody" : {
          "content" : {
            "application/json" : {
              "schema" : {
                "$ref" : "#/components/schemas/PatchOrganizationMembership"
              }
            }
          },
          "required" : true
        },
        "responses" : {
          "204" : {
            "content" : {
              "application/json" : {
                "schema" : {
                  "type" : "object"
                }
              }
            },
            "description" : "No Content"
          }
        },
        "tags" : [ "organizations" ]
      }
    },
    "/v1/pricing-policies" : {
      "get" : {
        "description" : "Retrieves a list of all pricing policies that the authenticated user has access to. This includes policies owned by the user and any shared policies. The response includes comprehensive details about each pricing policy, including name, currency, price specifications, and any conditional overrides.",
        "operationId" : "listPricingPolicies",
        "responses" : {
          "200" : {
            "content" : {
              "application/json" : {
                "schema" : {
                  "$ref" : "#/components/schemas/PricingPolicesList"
                }
              }
            },
            "description" : "The list of pricing policies was successfully retrieved"
          }
        },
        "summary" : "List all accessible pricing policies",
        "tags" : [ "pricing-policies" ]
      }
    },
    "/v1/pricing-policies/{id}" : {
      "delete" : {
        "description" : "Permanently deletes a pricing policy by its unique identifier. Only the pricing policy owner or users with appropriate permissions can delete a policy. Any event types associated with this pricing policy will need to be updated to use a different pricing policy.",
        "operationId" : "deletePricingPolicy",
        "parameters" : [ {
          "description" : "Unique identifier of the pricing policy to delete",
          "example" : "123e4567-e89b-12d3-a456-426614174000",
          "in" : "path",
          "name" : "id",
          "required" : true,
          "schema" : {
            "type" : "string",
            "format" : "uuid"
          }
        } ],
        "responses" : {
          "204" : {
            "content" : { },
            "description" : "The pricing policy was successfully deleted"
          },
          "403" : {
            "content" : {
              "application/json" : {
                "schema" : {
                  "$ref" : "#/components/schemas/ProblemDetail"
                }
              }
            },
            "description" : "The authenticated user does not have permission to delete this pricing policy"
          },
          "404" : {
            "content" : {
              "application/json" : {
                "schema" : {
                  "$ref" : "#/components/schemas/ProblemDetail"
                }
              }
            },
            "description" : "The pricing policy with the specified ID was not found"
          }
        },
        "summary" : "Delete a pricing policy",
        "tags" : [ "pricing-policies" ]
      },
      "get" : {
        "description" : "Retrieves detailed information about a specific pricing policy by its unique identifier. The response includes comprehensive details about the pricing policy, including its name, currency, default price specification, and any conditional overrides. Only the pricing policy owner or users with appropriate permissions can access a policy.",
        "operationId" : "getPricingPolicy",
        "parameters" : [ {
          "description" : "Unique identifier of the pricing policy to retrieve",
          "example" : "123e4567-e89b-12d3-a456-426614174000",
          "in" : "path",
          "name" : "id",
          "required" : true,
          "schema" : {
            "type" : "string",
            "format" : "uuid"
          }
        } ],
        "responses" : {
          "200" : {
            "content" : {
              "application/json" : {
                "schema" : {
                  "$ref" : "#/components/schemas/PricingPolicy"
                }
              }
            },
            "description" : "The requested pricing policy."
          },
          "403" : {
            "content" : {
              "application/json" : {
                "schema" : {
                  "$ref" : "#/components/schemas/ProblemDetail"
                }
              }
            },
            "description" : "The authenticated user can't access this pricing policy."
          },
          "404" : {
            "content" : {
              "application/json" : {
                "schema" : {
                  "$ref" : "#/components/schemas/ProblemDetail"
                }
              }
            },
            "description" : "The pricing policy does not exist."
          }
        },
        "summary" : "Get a pricing policy",
        "tags" : [ "pricing-policies" ]
      },
      "put" : {
        "description" : "Creates a new pricing policy or updates an existing one with the specified ID. Pricing policies define how services or products are priced, including base prices and any conditional overrides based on specific rules. The request must include the pricing policy's name, currency, and default price specification. Optionally, it can include conditional overrides for specific scenarios. Only the pricing policy owner or users with appropriate permissions can create or update a policy.",
        "operationId" : "putPricePolicy",
        "parameters" : [ {
          "description" : "Unique identifier of the pricing policy to create or update",
          "example" : "123e4567-e89b-12d3-a456-426614174000",
          "in" : "path",
          "name" : "id",
          "required" : true,
          "schema" : {
            "type" : "string",
            "format" : "uuid"
          }
        } ],
        "requestBody" : {
          "content" : {
            "application/json" : {
              "schema" : {
                "$ref" : "#/components/schemas/PutPricingPolicyRequest"
              }
            }
          },
          "required" : true
        },
        "responses" : {
          "204" : {
            "content" : {
              "application/json" : { }
            },
            "description" : "The pricing policy has been created or updated successfully."
          },
          "400" : {
            "content" : {
              "application/json" : {
                "schema" : {
                  "$ref" : "#/components/schemas/ProblemDetail"
                }
              }
            },
            "description" : "Some field is not valid."
          },
          "403" : {
            "content" : {
              "application/json" : {
                "schema" : {
                  "$ref" : "#/components/schemas/ProblemDetail"
                }
              }
            },
            "description" : "The authenticated user can't create or update this pricing policy."
          }
        },
        "summary" : "Creates or updates a pricing policy",
        "tags" : [ "pricing-policies" ]
      }
    },
    "/v1/public-profiles" : {
      "get" : {
        "description" : "Retrieves a list of all public profiles that the user has access to.\nThis includes profiles owned by the user and profiles owned by organizations the user belongs to.\n\nPublic profiles represent customizable pages that can be shared publicly for booking, containing information about\navailable event types, personal branding, and contact details.\n\nThis endpoint is useful for managing and viewing all the public-facing profiles that a user has access to,\nallowing them to see how their booking presence is organized across different contexts or audiences.",
        "operationId" : "listPublicProfiles",
        "responses" : {
          "200" : {
            "content" : {
              "application/json" : {
                "schema" : {
                  "$ref" : "#/components/schemas/PublicProfilesList"
                }
              }
            },
            "description" : "Successfully retrieved the list of public profiles the user has access to. Returns an empty collection if no profiles exist."
          },
          "403" : {
            "content" : {
              "application/json" : {
                "schema" : {
                  "$ref" : "#/components/schemas/PublicProfilesList"
                }
              }
            },
            "description" : "Forbidden - The authenticated user does not have permission to access this information."
          }
        },
        "summary" : "List all public profiles the user has access to",
        "tags" : [ "public-profile" ]
      }
    },
    "/v1/public-profiles/{id}" : {
      "delete" : {
        "description" : "Permanently deletes a public profile by its unique identifier.\n        \nPublic profiles in TimeTime represent sharable booking pages that allow external users to schedule appointments with resources.\nThey serve as the public-facing interface for scheduling and can be customized with branding, availability rules, and booking options.\n\nWhen a public profile is deleted:\n- The profile will no longer be accessible via its public URL\n- Any links or references to the profile will no longer work\n- The profile's configuration and customization settings will be permanently removed\n- Associated resources will remain intact but will no longer be bookable through this profile\n\nThis operation can only be performed by the profile owner or a user with administrative privileges.\nThe deletion is permanent and cannot be undone.",
        "operationId" : "deletePublicProfile",
        "parameters" : [ {
          "in" : "path",
          "name" : "id",
          "required" : true,
          "schema" : {
            "type" : "string",
            "format" : "uuid"
          }
        } ],
        "responses" : {
          "204" : {
            "content" : { },
            "description" : "The public profile was successfully deleted. No content is returned in the response body."
          },
          "403" : {
            "content" : { },
            "description" : "Forbidden - The authenticated user does not have permission to delete this public profile."
          },
          "404" : {
            "content" : { },
            "description" : "Not Found - No public profile exists with the specified ID."
          }
        },
        "summary" : "Delete a public profile",
        "tags" : [ "public-profile" ]
      },
      "get" : {
        "description" : "Retrieves detailed information about a specific public profile identified by its unique ID.\nThis endpoint returns all configuration settings for the public profile, including its name, slug, event types, and customization options.\nThe authenticated user must be the owner of the public profile to access it.\n\nPublic profiles represent customizable pages that can be shared publicly for booking, containing information about \navailable event types, personal branding, and contact details.",
        "operationId" : "getPublicProfile",
        "parameters" : [ {
          "in" : "path",
          "name" : "id",
          "required" : true,
          "schema" : {
            "type" : "string",
            "format" : "uuid"
          }
        } ],
        "responses" : {
          "200" : {
            "content" : {
              "application/json" : {
                "schema" : {
                  "$ref" : "#/components/schemas/PublicProfile"
                }
              }
            },
            "description" : "The public profile was successfully retrieved. The response contains the complete profile configuration."
          },
          "403" : {
            "content" : {
              "application/json" : {
                "schema" : {
                  "$ref" : "#/components/schemas/PublicProfile"
                }
              }
            },
            "description" : "Forbidden - The authenticated user does not have permission to access this public profile."
          },
          "404" : {
            "content" : {
              "application/json" : {
                "schema" : {
                  "$ref" : "#/components/schemas/PublicProfile"
                }
              }
            },
            "description" : "Not Found - No public profile exists with the specified ID."
          }
        },
        "summary" : "Get a public profile by ID",
        "tags" : [ "public-profile" ]
      },
      "put" : {
        "description" : "Creates a new public profile or updates an existing one with the specified ID.\n\nPublic profiles in TimeTime represent the publicly visible information about users, organizations, or resources.\nThey can be used to create booking pages, share availability, and provide a professional online presence.\n\nThis endpoint allows for comprehensive configuration of public profile settings including:\n- A unique slug for creating user-friendly URLs\n- Profile name and description\n- Profile image\n- Custom tags for categorization\n- External links to social media or websites\n\nThe authenticated user will become the owner of the profile if it's being created, or must be the\nexisting owner to update it.",
        "operationId" : "putPublicProfile",
        "parameters" : [ {
          "in" : "path",
          "name" : "id",
          "required" : true,
          "schema" : {
            "type" : "string",
            "format" : "uuid"
          }
        } ],
        "requestBody" : {
          "content" : {
            "application/json" : {
              "schema" : {
                "$ref" : "#/components/schemas/PublicProfileWriteModel"
              }
            }
          },
          "required" : true
        },
        "responses" : {
          "204" : {
            "content" : {
              "application/json" : {
                "schema" : {
                  "type" : "object"
                }
              }
            },
            "description" : "Public profile has been created or updated successfully."
          },
          "400" : {
            "content" : {
              "application/json" : {
                "schema" : {
                  "$ref" : "#/components/schemas/ProblemDetail"
                }
              }
            },
            "description" : "There is some problem with the received public profile."
          }
        },
        "summary" : "Create or update a public profile",
        "tags" : [ "public-profile" ]
      }
    },
    "/v1/public/event-types/{id}" : {
      "get" : {
        "description" : "Retrieves the publicly available details of an event type without requiring user authentication.\nThis endpoint is designed for public-facing applications where users can view event type information before booking.\n\nThe response includes essential information about the event type such as name, description, duration, and available\nbooking options, but excludes sensitive configuration details that are only available to authenticated event owners.\n\nThe event type can be identified either by its UUID or by a combination of the event owner's slug and the event type slug\n(in the format 'owner-slug:event-type-slug').\n\nInternationalization (i18n) is supported through the optional 'locale' parameter, allowing clients to request\nevent type information in a specific language if translations are available.",
        "operationId" : "getPublicEventType",
        "parameters" : [ {
          "description" : "The event type identifier. This endpoint admits 2 different ways for identifying the event type:\n\n1. The event type `UUID` (the same used when creating the event type).\n2. The combination of the event owner slug + the event type slug, concatenated by ':', example:\n`GET /v1/event-types/event-owner-slug:event-type-slug/availability`\n",
          "in" : "path",
          "name" : "id",
          "required" : true,
          "schema" : {
            "type" : "string"
          }
        }, {
          "description" : "Event types can have i18n configuration for some fields, such `name`, `description`,\nquestions `label` field...'\nThe `locale` query param can be used to ask for the event type translated into that language if\navailable.\nIf the event type has not been configured with translations for the queried language, the default values\nwill be used.\n",
          "in" : "query",
          "name" : "locale"
        } ],
        "responses" : {
          "200" : {
            "content" : {
              "application/json" : {
                "schema" : {
                  "$ref" : "#/components/schemas/GetPublicEventTypeModel"
                }
              }
            },
            "description" : "Successfully retrieved the public event type details. The response includes:\n- Basic information (id, name, description, duration)\n- Available booking options and constraints\n- Localized content based on the requested locale (if available)\n- Public-facing configuration details\n- Questions that need to be answered during booking\n- Available time slots and scheduling information"
          },
          "400" : {
            "content" : {
              "application/json" : {
                "schema" : {
                  "$ref" : "#/components/schemas/ProblemDetail"
                }
              }
            },
            "description" : "Bad Request - The provided event type identifier format is invalid.\nThis occurs when the ID parameter doesn't match either the UUID format or the 'owner-slug:event-type-slug' format."
          },
          "404" : {
            "content" : {
              "application/json" : {
                "schema" : {
                  "$ref" : "#/components/schemas/ProblemDetail"
                }
              }
            },
            "description" : "The requested event type does not exist or is not publicly available. This can occur if:\n- The event type ID or slug combination is invalid\n- The event type has been deleted\n- The event type is not published or is set to private visibility"
          }
        },
        "summary" : "Get public event type details without authentication",
        "tags" : [ "event-types" ]
      }
    },
    "/v1/public/tenant" : {
      "get" : {
        "description" : "Retrieves the public configuration for a tenant. This endpoint is used to fetch tenant-specific settings that are needed for customizing the application UI and behavior. The tenant is determined through one of three methods: 1) explicitly provided tenant ID parameter, 2) the referer domain, or 3) the authenticated user's tenant. This endpoint is accessible without authentication to support public-facing applications.",
        "operationId" : "getPublicTenant",
        "parameters" : [ {
          "in" : "header",
          "name" : "Referer",
          "required" : false,
          "schema" : {
            "type" : "string"
          }
        }, {
          "description" : "Optional tenant identifier to explicitly specify which tenant's configuration to retrieve. When provided, this parameter takes precedence over the referer domain and user's tenant. This is useful for multi-tenant applications that need to access a specific tenant's configuration.",
          "example" : "acme-corp",
          "in" : "query",
          "name" : "id",
          "required" : false,
          "schema" : {
            "type" : "string"
          }
        } ],
        "responses" : {
          "200" : {
            "content" : {
              "application/json" : {
                "schema" : {
                  "$ref" : "#/components/schemas/PublicTenant"
                }
              }
            },
            "description" : "The requested tenant configuration was successfully retrieved"
          },
          "404" : {
            "content" : {
              "application/json" : {
                "schema" : {
                  "$ref" : "#/components/schemas/PublicTenant"
                }
              }
            },
            "description" : "The requested tenant was not found or is not accessible"
          }
        },
        "security" : [ ],
        "summary" : "Gets the public tenant configuration",
        "tags" : [ "tenants" ]
      }
    },
    "/v1/resource-groups" : {
      "get" : {
        "description" : "Retrieves a list of all resource groups owned by the authenticated user.\nThis endpoint allows users to get an overview of their resource groups and their configurations.\n\nThe response includes complete details for each resource group, including all associated resources with their\nconfiguration settings. This allows clients to display and manage resource groups without additional API calls.",
        "operationId" : "listResourceGroups",
        "responses" : {
          "200" : {
            "content" : {
              "application/json" : {
                "schema" : {
                  "$ref" : "#/components/schemas/ResourceGroupsList"
                }
              }
            },
            "description" : "Successfully retrieved the list of resource groups. The response contains a collection of\nresource groups with their complete configuration details including ID, name, associated resources, and tags.\nIf the user doesn't own any resource groups, an empty collection will be returned."
          },
          "403" : {
            "content" : {
              "application/json" : {
                "schema" : {
                  "$ref" : "#/components/schemas/ProblemDetail"
                }
              }
            },
            "description" : "Forbidden - The authenticated user does not have permission to list resource groups."
          }
        },
        "summary" : "List all resource groups owned by the authenticated user",
        "tags" : [ "resources" ]
      }
    },
    "/v1/resource-groups/{id}" : {
      "delete" : {
        "description" : "Permanently deletes a resource group by its unique identifier.\nOnly resource group owners can delete a resource group. When a resource group is deleted, the resources within the group\nare not deleted, but they are no longer associated with the group. This action cannot be undone.\n\nResource groups provide a way to organize related resources for easier management. Deleting a resource group might be\nnecessary when restructuring your resource organization or when certain groupings are no longer needed.",
        "operationId" : "deleteResourceGroup",
        "parameters" : [ {
          "description" : "The unique identifier of the resource group to delete",
          "in" : "path",
          "name" : "id",
          "required" : true,
          "schema" : {
            "type" : "string",
            "format" : "uuid"
          }
        } ],
        "responses" : {
          "204" : {
            "content" : { },
            "description" : "The resource group was successfully deleted."
          },
          "403" : {
            "content" : { },
            "description" : "Forbidden - The authenticated user does not have permission to delete this resource group. Only the resource group owner can delete it."
          },
          "404" : {
            "content" : { },
            "description" : "Not Found - The resource group with the specified ID was not found."
          }
        },
        "summary" : "Delete a resource group",
        "tags" : [ "resources" ]
      },
      "get" : {
        "description" : "Retrieves detailed information about a specific resource group identified by its unique ID.\nThis endpoint returns all group configuration settings including name, associated resources, and tags.\nThe authenticated user must have permission to access the resource group, either as its owner or through a collaboration.",
        "operationId" : "getResourceGroup",
        "parameters" : [ {
          "description" : "The unique identifier of the resource group to retrieve",
          "in" : "path",
          "name" : "id",
          "required" : true,
          "schema" : {
            "type" : "string",
            "format" : "uuid"
          }
        } ],
        "responses" : {
          "200" : {
            "content" : {
              "application/json" : {
                "schema" : {
                  "$ref" : "#/components/schemas/ResourceGroup"
                }
              }
            },
            "description" : "The resource group was successfully retrieved. The response contains the complete resource group\nconfiguration including its ID, name, associated resources, and tags. Each associated resource includes its full\nconfiguration details."
          },
          "403" : {
            "content" : {
              "application/json" : {
                "schema" : {
                  "$ref" : "#/components/schemas/ProblemDetail"
                }
              }
            },
            "description" : "Forbidden - The authenticated user does not have permission to access this resource group.\nThis occurs when the user is neither the owner nor has collaboration access to the resource group."
          },
          "404" : {
            "content" : {
              "application/json" : {
                "schema" : {
                  "$ref" : "#/components/schemas/ProblemDetail"
                }
              }
            },
            "description" : "Not Found - No resource group exists with the specified ID.\nThis may occur if the resource group has been deleted or if the ID is invalid."
          }
        },
        "summary" : "Get a specific resource group by ID",
        "tags" : [ "resources" ]
      },
      "put" : {
        "description" : "Creates a new resource group or updates an existing one with the specified ID.\nIf the resource group doesn't exist, it will be created; otherwise, the existing resource group will be updated with the provided\nconfiguration.\n\nThis endpoint allows for organizing resources into logical groups for easier management. The authenticated user will\nbecome the owner of the resource group if it's being created, or must be the existing owner to update it.\n\nResources specified in the group must be accessible to the user (either owned by the user or shared with them through\ncollaborations).",
        "operationId" : "putResourceGroup",
        "parameters" : [ {
          "description" : "The unique identifier for the resource group. If a resource group with this ID already exists, it will be updated; otherwise, a new resource group will be created.",
          "in" : "path",
          "name" : "id",
          "required" : true,
          "schema" : {
            "type" : "string",
            "format" : "uuid"
          }
        } ],
        "requestBody" : {
          "content" : {
            "application/json" : {
              "schema" : {
                "$ref" : "#/components/schemas/PutResourceGroup"
              }
            }
          },
          "required" : true
        },
        "responses" : {
          "204" : {
            "content" : { },
            "description" : "The resource group was successfully created or updated. No content is returned in the response body."
          },
          "400" : {
            "content" : {
              "application/json" : {
                "schema" : {
                  "$ref" : "#/components/schemas/ProblemDetail"
                }
              }
            },
            "description" : "Bad Request - The request contains invalid parameters or validation errors.\nThis can occur if required fields are missing, if values don't meet validation requirements, or if any specified\nresource IDs are invalid or not accessible to the user."
          },
          "403" : {
            "content" : {
              "application/json" : {
                "schema" : {
                  "$ref" : "#/components/schemas/ProblemDetail"
                }
              }
            },
            "description" : "Forbidden - The authenticated user does not have permission to create or update this resource group.\nThis occurs when attempting to modify a resource group owned by another user."
          }
        },
        "summary" : "Create or update a resource group",
        "tags" : [ "resources" ]
      }
    },
    "/v1/resources" : {
      "get" : {
        "description" : "Retrieves a list of all resources that the authenticated user has access to, either as an owner\nor as a collaborator. This includes resources owned directly by the user and resources shared with the user through\norganization collaborations.\n\nTimeTime is designed to be a multipurpose scheduling platform that can handle various types of resources:\n- **People**: Staff members, professionals, service providers, teachers, doctors, etc.\n- **Physical spaces**: Meeting rooms, conference halls, event venues, restaurant tables\n- **Equipment**: Vehicles, tools, AV equipment, medical devices\n- **Digital assets**: Licenses, virtual meeting rooms\n- **Services**: Consultation slots, training sessions\n\nThis flexibility allows you to use TimeTime for diverse scheduling scenarios such as:\n- Healthcare appointment scheduling\n- Professional services booking\n- Workspace and facility management\n- Equipment rental and reservation\n- Venue and event space management\n- Educational and training session scheduling\n\nThe response includes complete configuration details for each resource, allowing the client to display and use these\nresources without additional API calls. Use the tags on each resource to identify its specific type and attributes\nfor your particular use case.",
        "operationId" : "listResources",
        "responses" : {
          "200" : {
            "content" : {
              "application/json" : {
                "schema" : {
                  "$ref" : "#/components/schemas/ResourcesList"
                }
              }
            },
            "description" : "Successfully retrieved the list of resources. The response contains a collection of resources\nwith their complete configuration details including ID, name, owner information, booking rules, tags, and collaborator settings.\nIf the user doesn't have access to any resources, an empty collection will be returned."
          }
        },
        "summary" : "List all resources accessible to the authenticated user",
        "tags" : [ "resources" ]
      }
    },
    "/v1/resources/{id}" : {
      "delete" : {
        "description" : "Permanently deletes a resource by its unique identifier.\nOnly resource owners can delete a resource. Once deleted, the resource will no longer be available for booking\nand all references to it will be removed from the system. This action cannot be undone.\n\nThis endpoint is useful when a resource is no longer available or needed in the system, such as when staff\nmembers leave, equipment is decommissioned, or rooms are no longer available for booking.",
        "operationId" : "deleteResource",
        "parameters" : [ {
          "description" : "The unique identifier of the resource to delete",
          "in" : "path",
          "name" : "id",
          "required" : true,
          "schema" : {
            "type" : "string",
            "format" : "uuid"
          }
        } ],
        "responses" : {
          "204" : {
            "content" : { },
            "description" : "The resource was successfully deleted."
          },
          "403" : {
            "content" : { },
            "description" : "Forbidden - The authenticated user does not have permission to delete this resource. Only the resource owner can delete it."
          },
          "404" : {
            "content" : { },
            "description" : "Not Found - The resource with the specified ID was not found."
          }
        },
        "summary" : "Delete a resource",
        "tags" : [ "resources" ]
      },
      "get" : {
        "description" : "Retrieves detailed information about a specific resource identified by its unique ID. \nThis endpoint returns all resource configuration settings including name, booking rules, tags, and collaborators.\nThe authenticated user must have permission to access the resource, either as its owner or as a collaborator.\n\nTimeTime resources are designed to be versatile and can represent many different types of bookable entities:\n- People (staff members, professionals, service providers, teachers, doctors, etc.)\n- Physical spaces (meeting rooms, conference halls, event venues, restaurant tables)\n- Equipment (vehicles, tools, AV equipment, medical devices)\n- Digital assets (licenses, virtual meeting rooms)\n- Services (consultation slots, training sessions)\n\nThis multipurpose design allows TimeTime to be adapted for virtually any scheduling scenario. The resource's tags\nprovide additional context about what type of entity the resource represents and its specific attributes for your\nuse case.",
        "operationId" : "getResource",
        "parameters" : [ {
          "in" : "path",
          "name" : "id",
          "required" : true,
          "schema" : {
            "type" : "string",
            "format" : "uuid"
          }
        } ],
        "responses" : {
          "200" : {
            "content" : {
              "application/json" : {
                "schema" : {
                  "$ref" : "#/components/schemas/Resource"
                }
              }
            },
            "description" : "The resource was successfully retrieved. The response contains the complete resource configuration \nincluding its ID, name, owner information, booking rules, tags, and collaborator details."
          },
          "403" : {
            "content" : {
              "application/json" : {
                "schema" : {
                  "$ref" : "#/components/schemas/ProblemDetail"
                }
              }
            },
            "description" : "Forbidden - The authenticated user does not have permission to access this resource. \nThis occurs when the user is neither the owner nor a collaborator of the resource."
          },
          "404" : {
            "content" : {
              "application/json" : {
                "schema" : {
                  "$ref" : "#/components/schemas/ProblemDetail"
                }
              }
            },
            "description" : "Not Found - No resource exists with the specified ID. \nThis may occur if the resource has been deleted or if the ID is invalid."
          }
        },
        "summary" : "Get a specific resource by ID",
        "tags" : [ "resources" ]
      },
      "put" : {
        "description" : "Creates a new resource or updates an existing one with the specified ID.\nIf the resource doesn't exist, it will be created; otherwise, the existing resource will be updated with the provided\nconfiguration.\n\nTimeTime is designed to be multipurpose, and resources can represent virtually any bookable entity:\n- **People**: Staff members, professionals, service providers, teachers, doctors, etc.\n- **Physical spaces**: Meeting rooms, conference halls, event venues, restaurant tables\n- **Equipment**: Vehicles, tools, AV equipment, medical devices\n- **Digital assets**: Licenses, virtual meeting rooms\n- **Services**: Consultation slots, training sessions\n\nThis flexibility allows TimeTime to be used for many different scheduling scenarios, such as:\n- Medical/healthcare appointment scheduling\n- Professional services booking\n- Workspace/desk booking\n- Equipment rental and reservation\n- Venue and event space management\n- Educational and training session scheduling\n\nThis endpoint allows for comprehensive configuration of resource settings including name, booking rules, tags, and\ncollaborators. The authenticated user will become the owner of the resource if it's being created, or must be the\nexisting owner to update it.\n\nUse the tags field to add domain-specific attributes to your resources to better organize and categorize them for your\nspecific use case.",
        "operationId" : "putResource",
        "parameters" : [ {
          "description" : "The unique identifier for the resource. If a resource with this ID already exists, it will be updated; otherwise, a new resource will be created.",
          "in" : "path",
          "name" : "id",
          "required" : true,
          "schema" : {
            "type" : "string",
            "format" : "uuid"
          }
        } ],
        "requestBody" : {
          "content" : {
            "application/json" : {
              "schema" : {
                "$ref" : "#/components/schemas/PutResource"
              }
            }
          },
          "required" : true
        },
        "responses" : {
          "204" : {
            "content" : { },
            "description" : "The resource was successfully created or updated. No content is returned in the response body."
          },
          "400" : {
            "content" : {
              "application/json" : {
                "schema" : {
                  "$ref" : "#/components/schemas/ProblemDetail"
                }
              }
            },
            "description" : "Bad Request - The request contains invalid parameters or validation errors.\nThis can occur if required fields are missing or if values don't meet validation requirements."
          },
          "403" : {
            "content" : {
              "application/json" : {
                "schema" : {
                  "$ref" : "#/components/schemas/ProblemDetail"
                }
              }
            },
            "description" : "Forbidden - The authenticated user does not have permission to create or update this resource.\nThis occurs when attempting to modify a resource owned by another user."
          }
        },
        "summary" : "Create or update a resource",
        "tags" : [ "resources" ]
      }
    },
    "/v1/shared-public-profiles/{slug}" : {
      "get" : {
        "description" : "Retrieves a public profile by its unique slug identifier.\n        \nPublic profiles in TimeTime represent sharable booking pages that allow external users to schedule appointments with resources.\nThey serve as the public-facing interface for scheduling and can be customized with branding, availability rules, and booking options.\n\nThis endpoint is publicly accessible and does not require authentication, making it suitable for sharing with end users\nwho want to book appointments. The slug is a URL-friendly identifier that uniquely identifies a public profile.\n\nThe response includes all public-facing configuration details for the profile, such as available services, customization settings,\nand booking rules. Sensitive information and internal configuration details are not exposed through this endpoint.",
        "operationId" : "getSharedPublicProfile",
        "parameters" : [ {
          "in" : "path",
          "name" : "slug",
          "required" : true,
          "schema" : {
            "type" : "string"
          }
        } ],
        "responses" : {
          "200" : {
            "content" : {
              "application/json" : {
                "schema" : {
                  "$ref" : "#/components/schemas/PublicProfile"
                }
              }
            },
            "description" : "The public profile was successfully retrieved. The response contains the complete public-facing profile configuration."
          },
          "404" : {
            "content" : {
              "application/json" : {
                "schema" : {
                  "$ref" : "#/components/schemas/PublicProfile"
                }
              }
            },
            "description" : "Not Found - No public profile exists with the specified slug, or the profile has been disabled or deleted."
          }
        },
        "security" : [ ],
        "summary" : "Get a public profile by its slug",
        "tags" : [ "public-profile" ]
      }
    },
    "/v1/tenant" : {
      "get" : {
        "description" : "Retrieves detailed information about the tenant associated with the authenticated user.\n\nTenants in TimeTime represent isolated customer environments within the platform. Each tenant:\n- Has its own users, resources, and configurations\n- May have different subscription levels and feature access\n- Operates as a separate business entity with distinct branding and settings\n- Has configurable authentication settings, integrations, and workflows\n\nTenants are the top-level organizational unit in TimeTime, with organizations and resources existing within a tenant.\nOnly administrators can access and modify tenant-level settings.\n\nThis endpoint returns the complete configuration for the tenant associated with the authenticated user,\nincluding subscription details, feature flags, and customization settings. The user must have\nappropriate permissions to access this information.",
        "operationId" : "getTenant",
        "responses" : {
          "200" : {
            "content" : {
              "application/json" : {
                "schema" : {
                  "$ref" : "#/components/schemas/Tenant"
                }
              }
            },
            "description" : "The tenant was successfully retrieved. The response contains complete tenant configuration including subscription details, branding settings, and feature flags."
          },
          "403" : {
            "content" : {
              "application/json" : {
                "schema" : {
                  "$ref" : "#/components/schemas/ProblemDetail"
                }
              }
            },
            "description" : "Forbidden - The authenticated user does not have permission to access tenant information. This occurs when the user is not an administrator of the tenant."
          },
          "404" : {
            "content" : {
              "application/json" : {
                "schema" : {
                  "$ref" : "#/components/schemas/ProblemDetail"
                }
              }
            },
            "description" : "Not Found - The tenant associated with the authenticated user does not exist or has been deleted."
          }
        },
        "summary" : "Get the current user's tenant",
        "tags" : [ "tenants" ]
      },
      "patch" : {
        "description" : "Updates an existing tenant with the provided configuration.\n\nA tenant in TimeTime represents an isolated customer environment with its own users, resources, and settings.\nThis endpoint allows you to update various tenant properties including:\n- The tenant's display name\n- Global webhook configurations for tenant-wide event notifications\n- Custom web application configuration settings\n\nUpdates to a tenant require administrative privileges. Only users with the ADMIN role for the tenant\ncan modify these settings. This endpoint is commonly used for:\n- Rebranding a tenant with a new name\n- Configuring global webhook integrations for the entire tenant\n- Updating tenant-specific application settings",
        "operationId" : "patchTenant",
        "requestBody" : {
          "content" : {
            "application/json" : {
              "schema" : {
                "$ref" : "#/components/schemas/PatchTenantRequest"
              }
            }
          },
          "required" : true
        },
        "responses" : {
          "200" : {
            "content" : {
              "application/json" : {
                "schema" : {
                  "$ref" : "#/components/schemas/Tenant"
                }
              }
            },
            "description" : "The updated tenant with all changes applied. Returns the complete tenant object with both updated and unchanged properties."
          },
          "403" : {
            "content" : {
              "application/json" : {
                "schema" : {
                  "$ref" : "#/components/schemas/ProblemDetail"
                }
              }
            },
            "description" : "Forbidden - The authenticated user doesn't have permission to update this tenant. Only users with the ADMIN role can modify tenant settings."
          },
          "404" : {
            "content" : {
              "application/json" : {
                "schema" : {
                  "$ref" : "#/components/schemas/ProblemDetail"
                }
              }
            },
            "description" : "Not Found - The tenant does not exist or the authenticated user doesn't have access to it."
          }
        },
        "summary" : "Updates a tenant.",
        "tags" : [ "tenants" ]
      },
      "post" : {
        "description" : "Creates a new tenant in the TimeTime system.\n\nA tenant in TimeTime represents an isolated customer environment with its own users, resources, and settings.\nEach tenant has a unique identifier and operates as a separate entity within the platform.\n\nCreating a tenant is typically the first step in setting up a new customer environment. Once created,\nyou can add users, resources, event types, and other entities to the tenant. Tenants provide complete\nisolation between different customer environments, ensuring data privacy and security.\n\nKey aspects of tenants:\n- Each tenant has a unique ID that becomes part of the URL for tenant-specific operations\n- Tenants have their own set of users with specific roles and permissions\n- Resources, event types, and bookings are scoped to a specific tenant\n- Tenant settings and configurations are isolated from other tenants\n\nThe user who creates a tenant automatically becomes an administrator for that tenant.",
        "operationId" : "postTenant",
        "requestBody" : {
          "content" : {
            "application/json" : {
              "schema" : {
                "$ref" : "#/components/schemas/CreateTenantRequest"
              }
            }
          },
          "required" : true
        },
        "responses" : {
          "201" : {
            "content" : {
              "application/json" : {
                "schema" : {
                  "$ref" : "#/components/schemas/Tenant"
                }
              }
            },
            "description" : "The tenant was successfully created. Returns the complete tenant object with all properties and a Location header with the URL to access the new tenant."
          },
          "400" : {
            "content" : {
              "application/json" : {
                "schema" : {
                  "$ref" : "#/components/schemas/ProblemDetail"
                }
              }
            },
            "description" : "Bad Request - The request contains invalid parameters. This typically occurs when the tenant ID already exists or doesn't meet the required format (must be a valid slug consisting of lowercase letters, numbers, and hyphens)."
          }
        },
        "summary" : "Creates a tenant.",
        "tags" : [ "tenants" ]
      }
    },
    "/v1/third-party-calendar-events" : {
      "get" : {
        "description" : "Retrieves events from third-party calendars that are associated with a specific event type.\n\nThis endpoint is useful for checking external calendar events that might affect availability for a given event type.\nIt returns events from connected third-party calendars (like Google Calendar, Microsoft Outlook, etc.) within the\nspecified date range.\n\nThe events returned can be used to:\n- Display busy times from external calendars\n- Avoid scheduling conflicts with existing appointments\n- Provide a comprehensive view of all calendar events affecting an event type's availability",
        "operationId" : "getThirdPartyCalendarEventsByEventType",
        "parameters" : [ {
          "in" : "query",
          "name" : "eventTypeId",
          "required" : true,
          "schema" : {
            "type" : "string",
            "format" : "uuid"
          }
        }, {
          "description" : "\nThe starting date to get the availability in ISO-8601 format, example: `2021-01-01`.\n\nIf the parameter is not provided, the current day in the UTC time zone is used.\n            ",
          "in" : "query",
          "name" : "from",
          "required" : false,
          "schema" : {
            "type" : "string",
            "format" : "date"
          }
        }, {
          "description" : "\nStarting from the 'from' value, this sets the limit day to verify the event availability.\n\nMinimum allowed is `1`, and maximum is `14`.\n            ",
          "in" : "query",
          "name" : "days",
          "required" : false,
          "schema" : {
            "type" : "integer",
            "format" : "int64",
            "default" : 7,
            "maximum" : 14,
            "minimum" : 1
          }
        } ],
        "responses" : {
          "200" : {
            "content" : {
              "application/json" : {
                "schema" : {
                  "$ref" : "#/components/schemas/ThirdPartyCalendarEventsList"
                }
              }
            },
            "description" : "Successful response with the appointments."
          },
          "404" : {
            "content" : {
              "application/json" : {
                "schema" : {
                  "type" : "object"
                }
              }
            },
            "description" : "The event type doesn't exist."
          }
        },
        "summary" : "Get third-party calendar events for an event type",
        "tags" : [ "bookings" ]
      }
    },
    "/v1/upcoming-bookings-email" : {
      "post" : {
        "description" : "Triggers the system to send an email containing upcoming bookings information to the specified email address.\n\nThis endpoint is typically used to provide users with a summary of their upcoming scheduled appointments, meetings, or reservations.\nThe email will include details about all bookings scheduled in the near future that are associated with the provided email address.\n\nThe locale parameter can be specified to control the language of the email content. If not provided, the system default locale will be used.\nThis allows for multi-language support in notification emails.",
        "operationId" : "triggerUpcomingBookingsEmail",
        "requestBody" : {
          "content" : {
            "application/json" : {
              "schema" : {
                "$ref" : "#/components/schemas/SendUpcomingBookingsEmailRequest"
              }
            }
          },
          "required" : true
        },
        "responses" : {
          "200" : {
            "content" : { },
            "description" : "The request was processed successfully and the email has been queued for delivery."
          },
          "201" : {
            "content" : { },
            "description" : "Created"
          },
          "400" : {
            "content" : { },
            "description" : "Bad Request - The request contains invalid parameters, typically due to an invalid email format."
          }
        },
        "summary" : "Send upcoming bookings email to a specific email address",
        "tags" : [ "bookings" ]
      }
    },
    "/v1/users" : {
      "get" : {
        "description" : "Retrieves a list of all users that the authenticated user has permission to view.\n\nThis endpoint returns user profiles based on the authenticated user's permissions:\n- Regular users can only see themselves and users in their organizations\n- Organization administrators can see all users in their organizations\n- System administrators can see all users in the system\n\nThe response includes basic profile information for each user, such as:\n- User ID and slug\n- Name and email address\n- Time zone and locale preferences\n- Organization memberships\n- Custom metadata (tags)\n\nThis endpoint is commonly used for user directories, member selection interfaces, and administrative dashboards.",
        "operationId" : "listUsers",
        "responses" : {
          "200" : {
            "content" : {
              "application/json" : {
                "schema" : {
                  "$ref" : "#/components/schemas/ListUsersResponse"
                }
              }
            },
            "description" : "Successfully retrieved the list of accessible users. The response contains user profiles with their details."
          },
          "403" : {
            "content" : {
              "application/json" : {
                "schema" : {
                  "$ref" : "#/components/schemas/ListUsersResponse"
                }
              }
            },
            "description" : "Forbidden - The authenticated user does not have permission to list users or is not authenticated as a Customer."
          }
        },
        "summary" : "List all accessible users",
        "tags" : [ "users" ]
      },
      "post" : {
        "description" : "Creates a new user in the tenant of the authenticated user making the request.\nThis endpoint allows tenant administrators to create additional users within their tenant.\nThe created user will have default permissions and settings for the tenant.\n\nThe request must include a valid email address, and may optionally include an external ID if the system\nneeds to link the TimeTime user with a user in an external system.",
        "operationId" : "createUser",
        "requestBody" : {
          "content" : {
            "application/json" : {
              "schema" : {
                "$ref" : "#/components/schemas/PostUserBody"
              }
            }
          },
          "required" : true
        },
        "responses" : {
          "201" : {
            "content" : { },
            "description" : "The user was successfully created. The location header contains the URL to retrieve the user details."
          },
          "400" : {
            "content" : { },
            "description" : "Bad Request - The request contains invalid parameters or validation errors. This typically occurs if the email format is invalid."
          },
          "403" : {
            "content" : { },
            "description" : "Forbidden - The authenticated user does not have permission to create users in this tenant."
          },
          "409" : {
            "content" : { },
            "description" : "Conflict - A user with the specified email address already exists in the tenant."
          }
        },
        "summary" : "Create a new user",
        "tags" : [ "users" ]
      }
    },
    "/v1/users/{id}" : {
      "get" : {
        "description" : "Retrieves detailed information about a specific user identified by their unique ID.\n\nUsers in TimeTime represent individuals who can interact with the system. Each user has a profile\ncontaining personal information, preferences, and system settings. This endpoint returns the profile\ninformation for a specific user.\n\nAccess to user profiles is restricted based on permissions:\n- Users can always access their own profile\n- Organization administrators can access profiles of users in their organization\n- System administrators can access any user profile\n\nThis endpoint is commonly used to display user information in profile pages, user directories,\nand administrative interfaces.",
        "operationId" : "getUser",
        "parameters" : [ {
          "description" : "The unique identifier of the user to retrieve",
          "example" : "123e4567-e89b-12d3-a456-426614174000",
          "in" : "path",
          "name" : "id",
          "required" : true,
          "schema" : {
            "type" : "string",
            "format" : "uuid"
          }
        } ],
        "responses" : {
          "200" : {
            "content" : {
              "application/json" : {
                "schema" : {
                  "$ref" : "#/components/schemas/User"
                }
              }
            },
            "description" : "The user profile was successfully retrieved. The response contains the user's profile information including name, email, preferences, and other details."
          },
          "403" : {
            "content" : {
              "application/json" : {
                "schema" : {
                  "$ref" : "#/components/schemas/User"
                }
              }
            },
            "description" : "Forbidden - The authenticated user does not have permission to access this user's profile."
          },
          "404" : {
            "content" : {
              "application/json" : {
                "schema" : {
                  "$ref" : "#/components/schemas/User"
                }
              }
            },
            "description" : "Not Found - No user exists with the specified ID."
          }
        },
        "summary" : "Get a user profile by ID",
        "tags" : [ "users" ]
      },
      "patch" : {
        "description" : "Updates specific properties of a user identified by their UUID.\n\nThis endpoint allows administrators to modify user properties, particularly their role within a tenant.\nCurrently, the main use case is changing a user's tenant role between MEMBER and ADMIN.\n\nChanging a user's role affects their permissions and access level within the tenant:\n- ADMIN users can manage tenant settings, add/remove users, and configure tenant-wide properties\n- MEMBER users have standard permissions and can use the system according to their assigned resources\n\nOnly tenant administrators can modify other users' roles. A user cannot modify their own role.",
        "operationId" : "patchUser",
        "parameters" : [ {
          "description" : "The unique identifier of the user to update",
          "in" : "path",
          "name" : "id",
          "required" : true,
          "schema" : {
            "type" : "string",
            "format" : "uuid"
          }
        } ],
        "requestBody" : {
          "content" : {
            "application/json" : {
              "schema" : {
                "$ref" : "#/components/schemas/PatchUserModel"
              }
            }
          },
          "required" : true
        },
        "responses" : {
          "204" : {
            "content" : {
              "application/json" : {
                "schema" : {
                  "type" : "object"
                }
              }
            },
            "description" : "No Content - The user was successfully updated. No content is returned in the response body."
          },
          "403" : {
            "content" : {
              "application/json" : {
                "schema" : {
                  "type" : "object"
                }
              }
            },
            "description" : "Forbidden - The authenticated user doesn't have permission to update this user. Only tenant administrators can modify user roles."
          },
          "404" : {
            "content" : {
              "application/json" : {
                "schema" : {
                  "type" : "object"
                }
              }
            },
            "description" : "Not Found - The specified user does not exist or the authenticated user doesn't have access to it."
          }
        },
        "summary" : "Update a user's properties",
        "tags" : [ "users" ]
      },
      "put" : {
        "description" : "Updates the profile information for a specific user identified by their unique ID.\n\nUser profiles in TimeTime contain personal information, preferences, and system settings that affect\nhow the user interacts with the platform. This endpoint allows updating various profile attributes including:\n\n- Slug: A unique, URL-friendly identifier for the user that can be used in public URLs\n- Time zone: The user's preferred time zone for displaying dates and times\n- Locale: The user's language and regional formatting preferences\n- Client state: Custom data that can be stored by client applications\n- Tags: Key-value pairs for additional metadata about the user\n\nOnly the user themselves or administrators with appropriate permissions can update a user's profile.\nAll fields in the request are required except for clientState and tags, which are optional.\n\nThe slug must be unique across all users in the system and follow the pattern of lowercase letters,\nnumbers, and hyphens, with a length between 2 and 36 characters.",
        "operationId" : "putProfile",
        "parameters" : [ {
          "description" : "The unique identifier of the user whose profile is being updated",
          "example" : "123e4567-e89b-12d3-a456-426614174000",
          "in" : "path",
          "name" : "id",
          "required" : true,
          "schema" : {
            "type" : "string",
            "format" : "uuid"
          }
        } ],
        "requestBody" : {
          "content" : {
            "application/json" : {
              "schema" : {
                "$ref" : "#/components/schemas/PutProfileBody"
              }
            }
          },
          "required" : true
        },
        "responses" : {
          "204" : {
            "content" : {
              "application/json" : {
                "schema" : {
                  "type" : "object"
                }
              }
            },
            "description" : "The profile has been updated successfully. No content is returned in the response body."
          },
          "400" : {
            "content" : {
              "application/json" : {
                "schema" : {
                  "type" : "object"
                }
              }
            },
            "description" : "Bad Request - The request contains invalid parameters or validation errors. This typically occurs if the slug format is invalid or other field constraints are violated."
          },
          "403" : {
            "content" : {
              "application/json" : {
                "schema" : {
                  "type" : "object"
                }
              }
            },
            "description" : "Forbidden - The authenticated user does not have permission to modify this user's profile."
          },
          "404" : {
            "content" : {
              "application/json" : {
                "schema" : {
                  "type" : "object"
                }
              }
            },
            "description" : "Not Found - No user exists with the specified ID."
          },
          "409" : {
            "content" : {
              "application/json" : {
                "schema" : {
                  "type" : "object"
                }
              }
            },
            "description" : "Conflict - The requested slug is already in use by another user and is not available."
          }
        },
        "summary" : "Update a user profile",
        "tags" : [ "users" ]
      }
    },
    "/v1/workflows" : {
      "get" : {
        "description" : "Retrieves a list of all workflows that the authenticated user has access to. \nThis includes workflows created by the user and workflows shared with the user through permissions.\n\nWorkflows in TimeTime are automated sequences of actions that are triggered by specific events within the system.\nThey enable automation of common tasks and processes, such as:\n- Sending confirmation emails when bookings are created\n- Updating calendar events when bookings are modified\n- Notifying team members when resources are reserved\n- Integrating with external systems through webhooks\n- Managing resource availability based on booking patterns\n\nWorkflows consist of triggers (events that start the workflow) and actions (tasks that are performed).\nThey can be configured to process specific conditions and perform different actions based on the event details.\n\nThe response provides complete configuration details for each workflow, including trigger events, actions, and associated resources.",
        "operationId" : "listWorkflows",
        "responses" : {
          "200" : {
            "content" : {
              "application/json" : {
                "schema" : {
                  "$ref" : "#/components/schemas/WorkflowsList"
                }
              }
            },
            "description" : "Successfully retrieved the list of accessible workflows. Returns an empty collection if no workflows are available."
          }
        },
        "summary" : "List all accessible workflows",
        "tags" : [ "workflows" ]
      }
    },
    "/v1/workflows/{id}" : {
      "delete" : {
        "description" : "Permanently deletes a workflow by its unique identifier.\n\nWorkflows in TimeTime are automated sequences of actions that are triggered by specific events within the system.\nThey enable automation of tasks such as sending confirmation emails, updating calendar events, and integrating with\nexternal systems through webhooks.\n\nDeleting a workflow has the following effects:\n- The workflow will no longer be triggered by any events in the system\n- Any scheduled future executions of the workflow will be canceled\n- Historical records of past workflow executions will be retained\n- Resources associated with the workflow will not be deleted, only the automation logic\n\nOnly workflow owners or users with appropriate permissions can delete a workflow. This operation cannot be undone,\nand if the workflow functionality is needed again, a new workflow will need to be created.",
        "operationId" : "deleteWorkflow",
        "parameters" : [ {
          "in" : "path",
          "name" : "id",
          "required" : true,
          "schema" : {
            "type" : "string",
            "format" : "uuid"
          }
        } ],
        "responses" : {
          "204" : {
            "content" : { },
            "description" : "The workflow was successfully deleted. No content is returned in the response body."
          },
          "403" : {
            "content" : {
              "application/json" : {
                "schema" : {
                  "$ref" : "#/components/schemas/ProblemDetail"
                }
              }
            },
            "description" : "Forbidden - The authenticated user does not have permission to delete this workflow."
          },
          "404" : {
            "content" : {
              "application/json" : {
                "schema" : {
                  "$ref" : "#/components/schemas/ProblemDetail"
                }
              }
            },
            "description" : "Not Found - The workflow with the specified ID was not found."
          }
        },
        "summary" : "Delete a workflow",
        "tags" : [ "workflows" ]
      },
      "get" : {
        "description" : "Retrieves detailed information about a specific workflow identified by its unique ID.\n\nWorkflows in TimeTime are automated sequences of actions that are triggered by specific events within the system.\nThey enable automation of common tasks and processes, such as:\n- Sending confirmation emails when bookings are created\n- Updating calendar events when bookings are modified\n- Notifying team members when resources are reserved\n- Integrating with external systems through webhooks\n- Managing resource availability based on booking patterns\n\nWorkflows consist of triggers (events that start the workflow) and actions (tasks that are performed).\nThey can be configured to process specific conditions and perform different actions based on the event details.\n\nThis endpoint returns all workflow configuration settings including trigger events, actions, and associated resources.\nThe authenticated user must have permission to access the workflow.",
        "operationId" : "getWorkflow",
        "parameters" : [ {
          "in" : "path",
          "name" : "id",
          "required" : true,
          "schema" : {
            "type" : "string",
            "format" : "uuid"
          }
        } ],
        "responses" : {
          "200" : {
            "content" : {
              "application/json" : {
                "schema" : {
                  "$ref" : "#/components/schemas/Workflow"
                }
              }
            },
            "description" : "The workflow was successfully retrieved. The response contains the complete workflow configuration including triggers, actions, and conditions."
          },
          "403" : {
            "content" : {
              "application/json" : {
                "schema" : {
                  "$ref" : "#/components/schemas/ProblemDetail"
                }
              }
            },
            "description" : "Forbidden - The authenticated user does not have permission to access this workflow."
          },
          "404" : {
            "content" : {
              "application/json" : {
                "schema" : {
                  "$ref" : "#/components/schemas/ProblemDetail"
                }
              }
            },
            "description" : "Not Found - No workflow exists with the specified ID."
          }
        },
        "summary" : "Get workflow details by ID",
        "tags" : [ "workflows" ]
      },
      "put" : {
        "description" : "Creates a new workflow or updates an existing one with the specified ID. \nIf the workflow doesn't exist, it will be created; otherwise, the existing workflow will be updated with the provided\nconfiguration.\n\nWorkflows in TimeTime are automated sequences of actions that are triggered by specific events within the system.\nThey enable automation of common tasks and processes, such as:\n- Sending confirmation emails when bookings are created\n- Updating calendar events when bookings are modified\n- Notifying team members when resources are reserved\n- Integrating with external systems through webhooks\n- Managing resource availability based on booking patterns\n\nCreating effective workflows can significantly improve the scheduling experience by automating repetitive tasks,\nensuring consistent communication, and facilitating seamless integrations with other systems.\n\nThe authenticated user must have permission to create or modify workflows for the specified owner entity.\nWhen creating a new workflow, the user will automatically become the workflow owner unless otherwise specified.",
        "operationId" : "putWorkflow",
        "parameters" : [ {
          "in" : "path",
          "name" : "id",
          "required" : true,
          "schema" : {
            "type" : "string",
            "format" : "uuid"
          }
        } ],
        "requestBody" : {
          "content" : {
            "application/json" : {
              "schema" : {
                "oneOf" : [ {
                  "$ref" : "#/components/schemas/PutAfterConfirmingBookingWorkflowRequest"
                } ]
              }
            }
          },
          "required" : true
        },
        "responses" : {
          "204" : {
            "content" : {
              "application/json" : {
                "schema" : {
                  "type" : "object"
                }
              }
            },
            "description" : "The workflow has been created or updated successfully. No content is returned in the response body."
          },
          "400" : {
            "content" : {
              "application/json" : {
                "schema" : {
                  "type" : "object"
                }
              }
            },
            "description" : "Bad Request - The request contains invalid parameters or validation errors, such as invalid trigger or action configurations."
          },
          "403" : {
            "content" : {
              "application/json" : {
                "schema" : {
                  "type" : "object"
                }
              }
            },
            "description" : "Forbidden - The authenticated user doesn't have permission to create or modify this workflow, or the specified owner is invalid."
          }
        },
        "summary" : "Create or update a workflow",
        "tags" : [ "workflows" ]
      }
    }
  },
  "components" : {
    "schemas" : {
      "AcceptedOrganizationInvite" : {
        "type" : "object",
        "description" : "The invitation details including the invitation code",
        "properties" : {
          "code" : {
            "type" : "string",
            "description" : "The unique invitation code received by the user when invited to the organization",
            "example" : "inv_a1b2c3d4e5f6"
          }
        },
        "required" : [ "code" ]
      },
      "AfterBookingRedirect" : {
        "type" : "object",
        "description" : "Defines a URL where the user should be redirected after a successful booking. This allows event organizers to direct attendees to custom landing pages, payment portals, or additional information pages specific to the booking they've just completed.",
        "properties" : {
          "url" : {
            "type" : "string",
            "format" : "uri",
            "description" : "The fully qualified URL where the user will be redirected after completing a booking. This URL can include query parameters to pass booking information. The system will append standard booking reference parameters to this URL automatically.",
            "example" : "https://example.com/thank-you-page"
          }
        },
        "required" : [ "url" ]
      },
      "AfterConfirmingBookingTrigger" : {
        "allOf" : [ {
          "$ref" : "#/components/schemas/WorkflowTrigger"
        }, {
          "type" : "object",
          "properties" : {
            "after" : {
              "type" : "string",
              "description" : "How long after confirming the booking the workflow should be executed, specified in ISO8601 duration format. For executing the workflow 15 minutes after confirming, use PT15M. If null, the workflow will be executed immediately upon confirmation.",
              "example" : "PT15M"
            }
          }
        } ],
        "description" : "Trigger that executes a workflow after a booking is confirmed. This can be configured to run immediately upon confirmation or after a specified delay."
      },
      "AfterConfirmingBookingWorkflowAction" : {
        "allOf" : [ {
          "$ref" : "#/components/schemas/WorkflowAction"
        }, {
          "type" : "object",
          "properties" : {
            "type" : {
              "type" : "string"
            }
          }
        } ],
        "description" : "Base model for actions that execute after a booking is confirmed. These actions typically perform post-booking operations like sending notifications, creating calendar events, or triggering integrations with external systems.",
        "discriminator" : {
          "propertyName" : "type"
        },
        "required" : [ "type" ]
      },
      "AnsweredQuestion" : {
        "type" : "object",
        "description" : "Represents a question answered by the booker during the booking process",
        "properties" : {
          "answer" : {
            "type" : "string",
            "description" : "The answer provided by the booker, can be null if not answered",
            "example" : "Email"
          },
          "id" : {
            "type" : "string",
            "description" : "Unique identifier of the question",
            "example" : "question1"
          },
          "label" : {
            "type" : "string",
            "description" : "Display label of the question",
            "example" : "What is your preferred contact method?"
          }
        },
        "required" : [ "id", "label" ]
      },
      "ApiKeyModel" : {
        "type" : "object",
        "description" : "Model representing an API key with its details",
        "properties" : {
          "id" : {
            "type" : "string",
            "format" : "uuid",
            "description" : "The unique identifier of the API key",
            "example" : "123e4567-e89b-12d3-a456-426614174000"
          },
          "key" : {
            "type" : "string",
            "description" : "The API key string",
            "example" : "tt1_a1b2j0..213d"
          },
          "name" : {
            "type" : "string",
            "description" : "Optional name assigned to the API key to identify its purpose",
            "example" : "Integration with CRM system"
          }
        },
        "required" : [ "id", "key" ]
      },
      "ApiKeysListModel" : {
        "type" : "object",
        "description" : "Response model containing a list of API keys owned by the authenticated user",
        "properties" : {
          "apiKeys" : {
            "type" : "array",
            "description" : "Collection of API keys with their details",
            "items" : {
              "$ref" : "#/components/schemas/ApiKeyModel"
            }
          }
        },
        "required" : [ "apiKeys" ]
      },
      "AssociatedWorkflow" : {
        "type" : "object",
        "description" : "Represents a workflow that is associated with an event type. Workflows define automated actions that are triggered based on events related to the event type, such as when a booking is confirmed.",
        "properties" : {
          "id" : {
            "type" : "string",
            "format" : "uuid",
            "description" : "The unique identifier of the workflow",
            "example" : "123e4567-e89b-12d3-a456-426614174000"
          }
        },
        "required" : [ "id" ]
      },
      "AvailableInGroupRule" : {
        "type" : "object",
        "description" : "Defines a rule that requires a minimum number of resources from a specific resource group to be available for a booking to be possible. This is used to ensure that bookings can only be made when sufficient resources of a particular type are available.",
        "properties" : {
          "group" : {
            "$ref" : "#/components/schemas/ResourceGroupId",
            "description" : "The resource group identifier that this rule applies to"
          },
          "min" : {
            "type" : "integer",
            "format" : "int32",
            "description" : "The minimum number of resources from this group that must be available for a booking to be possible. Must be at least 1.",
            "minimum" : 1
          }
        },
        "required" : [ "group", "min" ]
      },
      "BeforeEventTrigger" : {
        "allOf" : [ {
          "$ref" : "#/components/schemas/WorkflowTrigger"
        }, {
          "type" : "object",
          "properties" : {
            "before" : {
              "type" : "string",
              "format" : "duration",
              "description" : "How long before the actual event the workflow should be triggered, specified in ISO8601 duration format. For executing the workflow 15 minutes before the event, use PT15M. For 24 hours before, use PT24H.",
              "example" : "PT1H"
            }
          }
        } ],
        "description" : "Trigger that executes a workflow before a scheduled event begins. This is useful for sending reminders or preparing resources ahead of an upcoming event.",
        "required" : [ "before" ]
      },
      "BookedEventType" : {
        "type" : "object",
        "description" : "Represents an event type that has been booked",
        "properties" : {
          "id" : {
            "type" : "string",
            "format" : "uuid",
            "description" : "Unique identifier of the event type",
            "example" : "123e4567-e89b-12d3-a456-426614174000"
          },
          "name" : {
            "type" : "string",
            "description" : "Name of the event type",
            "example" : "30-minute consultation"
          },
          "owner" : {
            "$ref" : "#/components/schemas/BookedEventTypeOwnerUser",
            "description" : "Information about the owner of this event type"
          },
          "tags" : {
            "type" : "object",
            "additionalProperties" : {
              "type" : "string"
            },
            "description" : "Arbitrary key/value collection. Useful for API users to store metadata."
          }
        },
        "required" : [ "id", "name", "owner", "tags" ]
      },
      "BookedEventTypeOwnerUser" : {
        "type" : "object",
        "description" : "Represents a user who owns an event type",
        "properties" : {
          "email" : {
            "type" : "string",
            "description" : "Email address of the user",
            "example" : "organizer@example.com"
          },
          "externalId" : {
            "type" : "string",
            "description" : "Optional external identifier for the user",
            "example" : "ext-12345"
          },
          "id" : {
            "type" : "string",
            "format" : "uuid",
            "description" : "Unique identifier of the user",
            "example" : "123e4567-e89b-12d3-a456-426614174000"
          }
        },
        "required" : [ "email", "id" ]
      },
      "BookedResource" : {
        "type" : "object",
        "description" : "Represents a resource that has been booked as part of an appointment",
        "properties" : {
          "id" : {
            "type" : "string",
            "format" : "uuid",
            "description" : "Unique identifier of the booked resource",
            "example" : "123e4567-e89b-12d3-a456-426614174000"
          },
          "name" : {
            "type" : "string",
            "description" : "Name of the booked resource",
            "example" : "Conference Room A"
          }
        },
        "required" : [ "id", "name" ]
      },
      "Booker" : {
        "type" : "object",
        "description" : "Represents a user who books an appointment",
        "properties" : {
          "email" : {
            "type" : "string",
            "description" : "Email address of the person making the booking",
            "example" : "user@example.com"
          }
        },
        "required" : [ "email" ]
      },
      "BookerPhoneLocation" : {
        "allOf" : [ {
          "$ref" : "#/components/schemas/Location"
        }, {
          "type" : "object",
          "properties" : {
            "questionId" : {
              "type" : "string",
              "default" : "_defaultPhoneQuestionId",
              "description" : "The ID of the question used to collect the booker's phone number. By default, this uses a system-generated phone question ID, but it can be customized to use a specific phone question defined in the event type.",
              "example" : "_defaultPhoneQuestionId"
            }
          }
        } ],
        "description" : "Specifies that the event will take place via phone call. The system will collect the booker's phone number during the booking process, which will be used to establish contact at the scheduled time. This is suitable for consultations or interviews conducted by phone."
      },
      "BookerPhoneOption" : {
        "allOf" : [ {
          "$ref" : "#/components/schemas/LocationOption"
        } ],
        "description" : "Represents a location option where the meeting will take place via phone call. When this option is selected, the system will collect the booker's phone number during the booking process, which will be used to establish contact at the scheduled time."
      },
      "BookerSelectionLocation" : {
        "allOf" : [ {
          "$ref" : "#/components/schemas/Location"
        }, {
          "type" : "object",
          "properties" : {
            "questionId" : {
              "type" : "string",
              "default" : "_defaultLocationQuestionId",
              "description" : "The ID of the question used to present location options to the booker. By default, this uses a system-generated location question ID, but it can be customized to use a specific location selection question defined in the event type.",
              "example" : "_defaultLocationQuestionId"
            }
          }
        } ],
        "description" : "Allows the booker to choose from a set of predefined location options during the booking process. This is useful when offering multiple meeting options (e.g., in-person vs. virtual) and letting the booker decide which is most convenient for them."
      },
      "Booking" : {
        "type" : "object",
        "description" : "Represents a complete booking record with all details, including private information that is only accessible to authorized users such as event organizers and administrators. This model extends PublicBooking with additional internal data.",
        "properties" : {
          "answeredQuestions" : {
            "type" : "array",
            "items" : {
              "$ref" : "#/components/schemas/AnsweredQuestion"
            }
          },
          "bookedResources" : {
            "type" : "array",
            "items" : {
              "$ref" : "#/components/schemas/BookedResource"
            },
            "uniqueItems" : true
          },
          "booker" : {
            "$ref" : "#/components/schemas/Booker"
          },
          "cancellation" : {
            "$ref" : "#/components/schemas/BookingCancellationModel",
            "description" : "Not null if the booking has been cancelled."
          },
          "conferenceLink" : {
            "type" : "string",
            "format" : "uri"
          },
          "confirmedAt" : {
            "type" : "string",
            "format" : "date-time"
          },
          "eventType" : {
            "$ref" : "#/components/schemas/BookedEventType"
          },
          "heldUntil" : {
            "type" : "string",
            "format" : "date-time"
          },
          "id" : {
            "type" : "string",
            "format" : "uuid"
          },
          "interval" : {
            "$ref" : "#/components/schemas/InstantInterval"
          },
          "notes" : {
            "type" : "string",
            "description" : "Additional notes added by the booker when submitting the booking."
          },
          "price" : {
            "$ref" : "#/components/schemas/MonetaryAmount"
          },
          "privateNotes" : {
            "type" : "array",
            "items" : {
              "type" : "string"
            },
            "uniqueItems" : true
          },
          "status" : {
            "type" : "string",
            "description" : "Booking status.\n * `CONFIRMED` - Booking is confirmed.\n * `ON_HOLD` - Booking is on hold, this means the slot and the related resources are blocked till the hold is released.\n * `CANCELED` - Booking has been canceled.",
            "enum" : [ "CONFIRMED", "ON_HOLD", "CANCELED" ]
          },
          "units" : {
            "type" : "integer",
            "format" : "int32",
            "description" : "Booked units."
          }
        },
        "required" : [ "answeredQuestions", "bookedResources", "booker", "eventType", "id", "interval", "privateNotes", "status" ]
      },
      "BookingCancellationModel" : {
        "type" : "object",
        "description" : "Contains information about a cancelled booking, including who cancelled it, when it was cancelled, and the reason for cancellation. This model is included in booking responses when a booking has been cancelled.",
        "properties" : {
          "cancelledAt" : {
            "type" : "string",
            "format" : "date-time",
            "description" : "The timestamp when the booking was cancelled"
          },
          "cancelledBy" : {
            "type" : "string",
            "description" : "Identifies who cancelled the booking - either the organizer or the booker",
            "enum" : [ "ORGANIZER", "BOOKER" ]
          },
          "reason" : {
            "type" : "string",
            "description" : "Optional explanation provided for why the booking was cancelled"
          }
        },
        "required" : [ "cancelledAt", "cancelledBy" ]
      },
      "BookingChanged" : {
        "allOf" : [ {
          "$ref" : "#/components/schemas/Webhook"
        }, {
          "type" : "object",
          "properties" : {
            "new" : {
              "$ref" : "#/components/schemas/Booking",
              "description" : "The current state of the booking after the change"
            },
            "old" : {
              "$ref" : "#/components/schemas/Booking",
              "description" : "The previous state of the booking before the change, if available. This will be null for newly created bookings."
            }
          }
        } ],
        "description" : "Represents a webhook event payload that is sent when a booking is created, updated, or cancelled. This model contains both the new state of the booking and optionally the previous state, allowing webhook consumers to understand what changed.",
        "required" : [ "new" ]
      },
      "BookingConfirmationNotifications" : {
        "type" : "object",
        "description" : "Configures notifications that are sent immediately when a booking is created or confirmed. These notifications can use multiple channels to ensure all parties are informed about the new booking.",
        "properties" : {
          "sms" : {
            "$ref" : "#/components/schemas/BookingSmsNotification",
            "description" : "SMS notification settings for booking confirmations. When enabled, the system will send SMS messages to notify relevant parties about new bookings."
          },
          "whatsapp" : {
            "$ref" : "#/components/schemas/BookingWhatsappNotification",
            "description" : "WhatsApp notification settings for booking confirmations. When enabled, the system will send WhatsApp messages to notify relevant parties about new bookings."
          }
        }
      },
      "BookingMode" : {
        "type" : "object",
        "description" : "Defines how bookings are processed when created. The booking mode determines whether a booking is automatically confirmed or goes through a hold phase requiring explicit confirmation. This setting affects the booking flow and reservation experience for both users and system integrators.",
        "discriminator" : {
          "propertyName" : "type"
        },
        "properties" : {
          "type" : {
            "type" : "string"
          }
        },
        "required" : [ "type" ]
      },
      "BookingNotifications" : {
        "type" : "object",
        "description" : "Configures how notifications are sent for booking-related events. This model defines settings for both confirmation notifications (sent immediately after booking creation) and reminder notifications (sent at specified intervals before the event starts). These settings control which notification channels are enabled and their specific configuration.",
        "properties" : {
          "confirmation" : {
            "$ref" : "#/components/schemas/BookingConfirmationNotifications",
            "description" : "Notification settings for when a booking is created or confirmed. These notifications are sent immediately to inform relevant parties about the new booking."
          },
          "reminders" : {
            "type" : "array",
            "description" : "Set of reminder notifications to be sent before the event starts. Each reminder has its own timing and channel configuration. Multiple reminders can be configured to be sent at different times (e.g., 1 day before and 1 hour before).",
            "items" : {
              "$ref" : "#/components/schemas/BookingReminderNotifications"
            },
            "uniqueItems" : true
          }
        }
      },
      "BookingReminderNotifications" : {
        "type" : "object",
        "description" : "Configures a notification reminder to be sent at a specific time before an event starts. Multiple reminder configurations can be set up to send notifications at different times before the event (e.g., 1 day before, 1 hour before).",
        "properties" : {
          "sms" : {
            "$ref" : "#/components/schemas/BookingSmsNotification",
            "description" : "SMS notification settings for this specific reminder. When enabled, an SMS will be sent at the time specified by 'timeBefore'."
          },
          "timeBefore" : {
            "type" : "string",
            "format" : "duration",
            "description" : "The duration before the event start time when the reminder should be sent. Specified in ISO 8601 duration format (e.g., PT1H for 1 hour before, P1D for 1 day before).",
            "example" : "PT1H"
          },
          "webhook" : {
            "$ref" : "#/components/schemas/BookingWebhookNotification",
            "description" : "Webhook notification settings for this specific reminder. When enabled, an HTTP POST request will be sent to the configured webhook URL at the time specified by 'timeBefore'."
          },
          "whatsapp" : {
            "$ref" : "#/components/schemas/BookingWhatsappNotification",
            "description" : "WhatsApp notification settings for this specific reminder. When enabled, a WhatsApp message will be sent at the time specified by 'timeBefore'."
          }
        },
        "required" : [ "sms", "timeBefore", "webhook", "whatsapp" ]
      },
      "BookingRules" : {
        "type" : "object",
        "description" : "Defines the rules and constraints for booking an event type, including availability settings, buffers, and capacity limits",
        "properties" : {
          "afterBuffer" : {
            "type" : "string",
            "format" : "duration",
            "description" : "Buffer time to add after each booking, ensuring no bookings can be made immediately after this event",
            "example" : "PT15M"
          },
          "beforeBuffer" : {
            "type" : "string",
            "format" : "duration",
            "description" : "Buffer time to add before each booking, ensuring no bookings can be made immediately before this event",
            "example" : "PT15M"
          },
          "busyIntervals" : {
            "type" : "array",
            "description" : "Time periods that should be considered as busy, regardless of other availability settings",
            "items" : {
              "$ref" : "#/components/schemas/InstantInterval"
            },
            "uniqueItems" : true
          },
          "checkAvailabilityInCalendars" : {
            "type" : "array",
            "description" : "The list of third-party calendars to check for availability conflicts before allowing a booking",
            "items" : {
              "$ref" : "#/components/schemas/ThirdPartyCalendarId"
            },
            "uniqueItems" : true
          },
          "enabled" : {
            "type" : "boolean",
            "description" : "When set to false, the event type will never be available for booking, regardless of other availability settings"
          },
          "maxBookingNotice" : {
            "type" : "string",
            "format" : "duration",
            "description" : "Maximum notice period allowed for booking. For example, P30D means bookings can only be made up to 30 days in advance",
            "example" : "P30D"
          },
          "maxBookingsPerTimeUnit" : {
            "$ref" : "#/components/schemas/MaxBookingsPerTimeUnit",
            "description" : "Limits the maximum number of bookings that can be made within a specific time period, such as per day or per week"
          },
          "maxConcurrentBookings" : {
            "type" : "integer",
            "format" : "int32",
            "description" : "The maximum number of bookings that can be made for the same time slot. This is useful to model group activities, for example classes, where there's a maximum number of people that can attend the event. If maxConcurrentBookings = 1, only one booking will exist for each time slot.",
            "minimum" : 1
          },
          "minBookingNotice" : {
            "type" : "string",
            "format" : "duration",
            "description" : "Minimum notice period required for booking. For example, PT24H means bookings must be made at least 24 hours in advance",
            "example" : "PT24H"
          },
          "repeatingAvailability" : {
            "$ref" : "#/components/schemas/RepeatingAvailability",
            "description" : "Defines the repeating availability pattern for this event type, such as weekly recurring time slots"
          },
          "resourceRules" : {
            "$ref" : "#/components/schemas/ResourceRules",
            "description" : "Rules for resource allocation during booking, specifying which resources are required and in what quantities"
          },
          "units" : {
            "$ref" : "#/components/schemas/Units",
            "description" : "Configuration for unit-based booking, where each booking can consume a variable number of units from the available capacity"
          }
        },
        "required" : [ "enabled" ]
      },
      "BookingSmsNotification" : {
        "type" : "object",
        "description" : "Configuration for SMS notifications. When enabled, the system will send SMS messages according to the notification settings defined in the parent models.",
        "properties" : {
          "enabled" : {
            "type" : "boolean",
            "description" : "Controls whether SMS notifications are active for this notification type. When set to true, the system will send SMS messages; when false, no SMS messages will be sent.",
            "example" : true
          }
        },
        "required" : [ "enabled" ]
      },
      "BookingWebhookNotification" : {
        "type" : "object",
        "description" : "Configuration for webhook notifications. When enabled, the system will make HTTP POST requests to the configured webhook URL according to the notification settings defined in the parent models.",
        "properties" : {
          "enabled" : {
            "type" : "boolean",
            "description" : "Controls whether webhook notifications are active for this notification type. When set to true, the system will make HTTP POST requests to the configured webhook endpoints; when false, no webhook requests will be sent. Webhook configuration is defined at the tenant level and applies to all enabled webhook notifications.",
            "example" : true
          }
        },
        "required" : [ "enabled" ]
      },
      "BookingWhatsappNotification" : {
        "type" : "object",
        "description" : "Configuration for WhatsApp notifications. When enabled, the system will send WhatsApp messages according to the notification settings defined in the parent models, optionally including additional custom information.",
        "properties" : {
          "additionalInformation" : {
            "type" : "string",
            "description" : "Optional custom text to be appended to the standard WhatsApp message template. This can include additional instructions, links, or context for the recipient. Limited to 1024 characters.",
            "example" : "Please bring your ID and arrive 10 minutes early.",
            "maxLength" : 1024,
            "minLength" : 0
          },
          "enabled" : {
            "type" : "boolean",
            "description" : "Controls whether WhatsApp notifications are active for this notification type. When set to true, the system will send WhatsApp messages; when false, no WhatsApp messages will be sent.",
            "example" : true
          }
        },
        "required" : [ "enabled" ]
      },
      "BookingsList" : {
        "type" : "object",
        "description" : "A collection of bookings accessible to the authenticated user",
        "properties" : {
          "bookings" : {
            "type" : "array",
            "description" : "List of booking details including event type information, scheduled times, and status",
            "items" : {
              "$ref" : "#/components/schemas/PublicBooking"
            }
          }
        },
        "required" : [ "bookings" ]
      },
      "Calendar" : {
        "type" : "object",
        "description" : "Represents a calendar in the system, which can contain events and be associated with a user or other entity",
        "properties" : {
          "defaultTimeZone" : {
            "type" : "string",
            "description" : "The default timezone used for displaying events in this calendar",
            "example" : "America/New_York"
          },
          "description" : {
            "type" : "string",
            "description" : "Optional description of the calendar's purpose or contents",
            "example" : "Calendar for work-related meetings and events"
          },
          "id" : {
            "type" : "string",
            "format" : "uuid",
            "description" : "The unique identifier of the calendar",
            "example" : "123e4567-e89b-12d3-a456-426614174000"
          },
          "name" : {
            "type" : "string",
            "description" : "The display name of the calendar",
            "example" : "Work Calendar"
          },
          "owner" : {
            "$ref" : "#/components/schemas/CalendarOwner",
            "description" : "The owner of the calendar"
          },
          "tags" : {
            "type" : "object",
            "additionalProperties" : {
              "type" : "string"
            },
            "description" : "Arbitrary key/value collection. Useful for API users to store metadata."
          }
        },
        "required" : [ "id", "name", "owner", "tags" ]
      },
      "CalendarEvent" : {
        "type" : "object",
        "description" : "Represents an event within a calendar, such as meetings, appointments, or reminders. Events can have various properties including time intervals, locations, attendees, and status information.",
        "properties" : {
          "attachments" : {
            "type" : "array",
            "description" : "Collection of files or documents attached to the event",
            "items" : {
              "$ref" : "#/components/schemas/CalendarEventAttachment"
            },
            "uniqueItems" : true
          },
          "attendees" : {
            "type" : "array",
            "description" : "List of participants or invitees for the event, including their status (accepted, declined, etc.)",
            "items" : {
              "$ref" : "#/components/schemas/CalendarEventAttendee"
            },
            "uniqueItems" : true
          },
          "calendarId" : {
            "type" : "string",
            "format" : "uuid",
            "description" : "The unique identifier of the calendar this event belongs to",
            "example" : "123e4567-e89b-12d3-a456-426614174001"
          },
          "comments" : {
            "type" : "array",
            "description" : "Collection of comments or notes associated with the event",
            "items" : {
              "type" : "string"
            },
            "uniqueItems" : true
          },
          "description" : {
            "type" : "string",
            "description" : "Detailed description of the event, providing additional context or information",
            "example" : "Weekly team sync to discuss project progress and upcoming tasks"
          },
          "id" : {
            "type" : "string",
            "format" : "uuid",
            "description" : "The unique identifier of the event",
            "example" : "123e4567-e89b-12d3-a456-426614174000"
          },
          "interval" : {
            "$ref" : "#/components/schemas/ZonedDateTimeInterval",
            "description" : "Interval indicating when the event is happening. It's optional, as an event without an interval is valid for representing pending tasks or events without a specific scheduled time."
          },
          "locations" : {
            "type" : "array",
            "description" : "Collection of locations associated with the event. An event may have multiple locations, such as a physical room and an online conference link.",
            "items" : {
              "$ref" : "#/components/schemas/CalendarEventLocation"
            },
            "uniqueItems" : true
          },
          "notifications" : {
            "type" : "array",
            "description" : "Collection of notification settings for the event, such as reminders at specific times",
            "items" : {
              "oneOf" : [ {
                "$ref" : "#/components/schemas/EmailConfirmationCalendarEventNotification"
              }, {
                "$ref" : "#/components/schemas/SmsBeforeCalendarEventNotification"
              }, {
                "$ref" : "#/components/schemas/SmsConfirmationCalendarEventNotification"
              }, {
                "$ref" : "#/components/schemas/WhatsappBeforeCalendarEventNotification"
              }, {
                "$ref" : "#/components/schemas/WhatsappConfirmationCalendarEventNotification"
              } ]
            },
            "uniqueItems" : true
          },
          "status" : {
            "type" : "string",
            "description" : "Status of the event, such as confirmed, tentative, or cancelled",
            "enum" : [ "CONFIRMED", "CANCELLED", "TENTATIVE" ],
            "example" : "CONFIRMED"
          },
          "summary" : {
            "type" : "string",
            "description" : "Summary or title of the event",
            "example" : "Team Meeting"
          },
          "tags" : {
            "type" : "object",
            "additionalProperties" : {
              "type" : "string"
            },
            "description" : "Arbitrary key/value collection. Useful for API users to store metadata.",
            "example" : {
              "priority" : "high",
              "department" : "engineering"
            }
          }
        },
        "required" : [ "attachments", "attendees", "calendarId", "comments", "id", "locations", "notifications", "status", "tags" ]
      },
      "CalendarEventAttachment" : {
        "type" : "object",
        "properties" : {
          "mimeType" : {
            "type" : "string",
            "description" : "Attachment MIME type as defined in RFC 2045 and 2046. Example 'image/jpeg'. It'll be helpful for the frontend apps to show images for example.",
            "example" : "image/jpeg",
            "maxLength" : 64,
            "minLength" : 0
          },
          "url" : {
            "type" : "string",
            "format" : "uri",
            "description" : "URI of the attachment. The TimeTime server won't try to fetch it."
          }
        },
        "required" : [ "url" ]
      },
      "CalendarEventAttendee" : {
        "type" : "object",
        "properties" : {
          "comment" : {
            "type" : "string",
            "description" : "The attendee's response comment."
          },
          "displayName" : {
            "type" : "string",
            "description" : "The attendee's name, if available."
          },
          "email" : {
            "type" : "string",
            "description" : "The attendee's email address."
          },
          "id" : {
            "type" : "string",
            "format" : "uuid",
            "description" : "The attendee id."
          },
          "invitation" : {
            "$ref" : "#/components/schemas/CalendarEventAttendeeInvitation",
            "description" : "The invitation"
          },
          "managementUrl" : {
            "type" : "string",
            "format" : "uri",
            "description" : "The public URL the attendee can use to reply if they accept or not the invite.\nWhen the attendee status is NEEDS_ACTION, this URL should be sent to the attendee so they can reply."
          },
          "organizer" : {
            "type" : "boolean",
            "description" : "Whether the attendee is the organizer of the event."
          },
          "phone" : {
            "type" : "string",
            "description" : "The attendee's phone number, if available, in e164 format.",
            "maxLength" : 36,
            "minLength" : 0
          },
          "status" : {
            "type" : "string",
            "description" : "The attendee's response status.",
            "enum" : [ "NEEDS_ACTION", "DECLINED", "TENTATIVE", "ACCEPTED" ]
          }
        },
        "required" : [ "id", "organizer", "status" ]
      },
      "CalendarEventAttendeeInvitation" : {
        "type" : "object",
        "properties" : {
          "description" : {
            "type" : "string"
          },
          "displayTimeMode" : {
            "type" : "string",
            "description" : "Configures how TimeTime will show the invitation event time.\n * `EXACT` - It'll show the exact start/end time of the event.\n * `FUZZY` - It'll show a fuzzy version of the event time, like 'MORNING', 'AFTERNOON'... * `START_DATE` - It'll show the starting date day, without time (hours, minutes...) information.",
            "enum" : [ "EXACT", "FUZZY", "START_DATE" ]
          },
          "id" : {
            "type" : "string",
            "format" : "uuid",
            "description" : "The invitation id."
          },
          "subtitle" : {
            "type" : "string"
          },
          "summary" : {
            "type" : "string"
          }
        },
        "required" : [ "displayTimeMode", "id" ]
      },
      "CalendarEventAttendeeReplyChange" : {
        "allOf" : [ {
          "$ref" : "#/components/schemas/CalendarEventDiff"
        }, {
          "type" : "object",
          "properties" : {
            "attendee" : {
              "$ref" : "#/components/schemas/CalendarEventAttendee"
            }
          }
        } ],
        "required" : [ "attendee" ]
      },
      "CalendarEventAttendeeRequest" : {
        "type" : "object",
        "properties" : {
          "comment" : {
            "type" : "string",
            "description" : "The attendee's response comment.",
            "maxLength" : 1024,
            "minLength" : 0
          },
          "displayName" : {
            "type" : "string",
            "description" : "The attendee's name, if available.",
            "maxLength" : 256,
            "minLength" : 0
          },
          "email" : {
            "type" : "string",
            "description" : "The attendee's email address, if available.",
            "maxLength" : 4096,
            "minLength" : 0
          },
          "id" : {
            "type" : "string",
            "format" : "uuid",
            "description" : "The attendee id."
          },
          "invitation" : {
            "$ref" : "#/components/schemas/PutCalendarEventAttendeeInvitationRequest",
            "description" : "The invitation"
          },
          "phone" : {
            "type" : "string",
            "description" : "The attendee's phone number, if available, in e164 format.",
            "maxLength" : 36,
            "minLength" : 0
          },
          "status" : {
            "type" : "string",
            "description" : "The attendee's response status.",
            "enum" : [ "NEEDS_ACTION", "DECLINED", "TENTATIVE", "ACCEPTED" ]
          }
        }
      },
      "CalendarEventChanged" : {
        "allOf" : [ {
          "$ref" : "#/components/schemas/Webhook"
        }, {
          "type" : "object",
          "properties" : {
            "new" : {
              "$ref" : "#/components/schemas/CalendarEvent",
              "description" : "The current state of the calendar event after the change"
            },
            "semanticDiff" : {
              "type" : "array",
              "description" : "A list of semantic differences that describe what changed in the calendar event, such as scheduling changes, attendee reply changes, or status changes",
              "items" : {
                "oneOf" : [ {
                  "$ref" : "#/components/schemas/CalendarEventAttendeeReplyChange"
                }, {
                  "$ref" : "#/components/schemas/CalendarEventScheduled"
                }, {
                  "$ref" : "#/components/schemas/CalendarEventStatusChanged"
                } ]
              }
            }
          }
        } ],
        "description" : "Represents a webhook event payload that is sent when a calendar event is created, updated, or cancelled. This model contains both the new state of the calendar event and semantic differences that describe what changed.",
        "required" : [ "new", "semanticDiff" ]
      },
      "CalendarEventDiff" : {
        "type" : "object",
        "description" : "This is kind of syntax sugar to improve the Developer Experience for the webhook receiver. Some of the changes in the Calendar Event receive an special treatment and have a name and additional information.\nNot all Calendar Event changes have an specific 'diff' value.",
        "discriminator" : {
          "propertyName" : "type"
        },
        "properties" : {
          "type" : {
            "type" : "string"
          }
        },
        "required" : [ "type" ]
      },
      "CalendarEventInvitation" : {
        "type" : "object",
        "description" : "Represents an invitation to a calendar event, containing details about the event and the invited attendee",
        "properties" : {
          "description" : {
            "type" : "string",
            "description" : "Detailed description of the event",
            "example" : "Discussion of quarterly goals and project timelines"
          },
          "event" : {
            "$ref" : "#/components/schemas/CalendarEventInvitationEventModel",
            "description" : "Information about the event, including timing details"
          },
          "id" : {
            "type" : "string",
            "format" : "uuid",
            "description" : "The unique identifier of the invitation",
            "example" : "123e4567-e89b-12d3-a456-426614174000"
          },
          "invitedAttendee" : {
            "$ref" : "#/components/schemas/PublicInvitedAttendee",
            "description" : "Information about the person invited to the event, including their response status"
          },
          "subtitle" : {
            "type" : "string",
            "description" : "A secondary title or additional context for the event",
            "example" : "Q1 Planning Session"
          },
          "summary" : {
            "type" : "string",
            "description" : "The title or main heading of the event",
            "example" : "Team Meeting"
          }
        },
        "required" : [ "event", "id", "invitedAttendee" ]
      },
      "CalendarEventInvitationEvent" : {
        "type" : "object",
        "description" : "Base class for different types of time interval representations for calendar event invitations",
        "discriminator" : {
          "propertyName" : "type"
        },
        "properties" : {
          "type" : {
            "type" : "string"
          }
        },
        "required" : [ "type" ]
      },
      "CalendarEventInvitationEventModel" : {
        "type" : "object",
        "description" : "Contains information about the event associated with an invitation",
        "properties" : {
          "interval" : {
            "description" : "The time interval for the event, which can be represented in different formats (concrete, fuzzy, or start date only)",
            "oneOf" : [ {
              "$ref" : "#/components/schemas/ConcreteCalendarEventInvitationInterval"
            }, {
              "$ref" : "#/components/schemas/FuzzyCalendarEventInvitationInterval"
            }, {
              "$ref" : "#/components/schemas/StartDateCalendarEventInvitationInterval"
            } ]
          }
        }
      },
      "CalendarEventLocation" : {
        "type" : "object",
        "properties" : {
          "text" : {
            "type" : "string",
            "description" : "Event location in a free text form. It won't be processed by the server.",
            "maxLength" : 4096,
            "minLength" : 0
          }
        },
        "required" : [ "text" ]
      },
      "CalendarEventNotification" : {
        "type" : "object",
        "description" : "Calendar Event notification.",
        "discriminator" : {
          "propertyName" : "type"
        },
        "properties" : {
          "type" : {
            "type" : "string"
          }
        },
        "required" : [ "type" ]
      },
      "CalendarEventScheduled" : {
        "allOf" : [ {
          "$ref" : "#/components/schemas/CalendarEventDiff"
        }, {
          "type" : "object",
          "properties" : {
            "interval" : {
              "$ref" : "#/components/schemas/ZonedDateTimeInterval"
            }
          }
        } ]
      },
      "CalendarEventStatusChanged" : {
        "allOf" : [ {
          "$ref" : "#/components/schemas/CalendarEventDiff"
        }, {
          "type" : "object",
          "properties" : {
            "new" : {
              "type" : "string",
              "enum" : [ "CONFIRMED", "CANCELLED", "TENTATIVE" ]
            },
            "old" : {
              "type" : "string",
              "enum" : [ "CONFIRMED", "CANCELLED", "TENTATIVE" ]
            }
          }
        } ],
        "required" : [ "new", "old" ]
      },
      "CalendarEventsList" : {
        "type" : "object",
        "properties" : {
          "items" : {
            "type" : "array",
            "items" : {
              "$ref" : "#/components/schemas/CalendarEvent"
            }
          }
        },
        "required" : [ "items" ]
      },
      "CalendarOwner" : {
        "type" : "object",
        "description" : "Represents the owner of a calendar, which can be either a user or an organization",
        "discriminator" : {
          "propertyName" : "type"
        },
        "oneOf" : [ {
          "$ref" : "#/components/schemas/CalendarOwnerUser"
        }, {
          "$ref" : "#/components/schemas/CalendarOwnerOrg"
        } ],
        "properties" : {
          "type" : {
            "type" : "string"
          }
        },
        "required" : [ "type" ]
      },
      "CalendarOwnerOrg" : {
        "allOf" : [ {
          "$ref" : "#/components/schemas/CalendarOwner"
        }, {
          "type" : "object",
          "properties" : {
            "id" : {
              "type" : "string",
              "format" : "uuid",
              "description" : "The unique identifier of the organization that owns the calendar",
              "example" : "123e4567-e89b-12d3-a456-426614174000"
            }
          }
        } ],
        "description" : "Represents a calendar owned by an organization, which can be shared among organization members",
        "required" : [ "id" ]
      },
      "CalendarOwnerUser" : {
        "allOf" : [ {
          "$ref" : "#/components/schemas/CalendarOwner"
        }, {
          "type" : "object",
          "properties" : {
            "id" : {
              "type" : "string",
              "format" : "uuid",
              "description" : "The unique identifier of the user who owns the calendar",
              "example" : "123e4567-e89b-12d3-a456-426614174000"
            }
          }
        } ],
        "description" : "Represents a calendar owned by an individual user",
        "required" : [ "id" ]
      },
      "CalendarsList" : {
        "type" : "object",
        "properties" : {
          "items" : {
            "type" : "array",
            "items" : {
              "$ref" : "#/components/schemas/Calendar"
            }
          }
        },
        "required" : [ "items" ]
      },
      "CancelBookingRequest" : {
        "type" : "object",
        "description" : "Optional cancellation details including the reason for cancellation",
        "properties" : {
          "reason" : {
            "type" : "string",
            "description" : "Optional reason for cancellation",
            "example" : "Meeting no longer needed",
            "maxLength" : 512,
            "minLength" : 0
          }
        }
      },
      "ConcreteCalendarEventInvitationInterval" : {
        "allOf" : [ {
          "$ref" : "#/components/schemas/CalendarEventInvitationEvent"
        }, {
          "type" : "object",
          "properties" : {
            "interval" : {
              "$ref" : "#/components/schemas/ZonedDateTimeInterval",
              "description" : "Interval indicating when the event is happening. It's optional, an event without an interval is a valid event in TimeTime. It can be useful to keep track of pending tasks that have not a date in the moment of its creation."
            }
          }
        } ],
        "required" : [ "interval" ]
      },
      "CreateApiKeyBody" : {
        "type" : "object",
        "description" : "API key creation details",
        "properties" : {
          "name" : {
            "type" : "string",
            "description" : "Optional name for the API key to help identify its purpose",
            "example" : "Integration with CRM system"
          }
        }
      },
      "CreateApiKeyResponseModel" : {
        "type" : "object",
        "description" : "Response model returned after successfully creating an API key",
        "properties" : {
          "id" : {
            "type" : "string",
            "format" : "uuid",
            "description" : "The unique identifier of the newly created API key",
            "example" : "123e4567-e89b-12d3-a456-426614174000"
          },
          "key" : {
            "type" : "string",
            "description" : "The actual API key string that should be securely stored. This value is only returned once.",
            "example" : "ttk_a1b2c3d4e5f6g7h8i9j0"
          }
        },
        "required" : [ "id", "key" ]
      },
      "CreateBookingRequest" : {
        "type" : "object",
        "description" : "The booking details including event type, start time, and optional information",
        "properties" : {
          "answers" : {
            "type" : "object",
            "additionalProperties" : {
              "type" : "string"
            },
            "description" : "Answers to custom questions defined in the event type. Keys are question IDs and values are the answers.",
            "example" : {
              "question_1" : "Answer to question 1",
              "question_2" : "Answer to question 2"
            }
          },
          "bookerEmail" : {
            "type" : "string",
            "deprecated" : true,
            "description" : "Email address of the booker. For multiple emails, separate with commas.",
            "example" : "user@example.com"
          },
          "eventTypeId" : {
            "type" : "string",
            "format" : "uuid",
            "description" : "The unique identifier of the event type to book",
            "example" : "123e4567-e89b-12d3-a456-426614174000"
          },
          "notes" : {
            "type" : "string",
            "description" : "Optional notes or additional information for the booking",
            "example" : "Please prepare the documents before the meeting",
            "maxLength" : 2048,
            "minLength" : 0
          },
          "start" : {
            "type" : "string",
            "format" : "date-time",
            "description" : "The start time of the booking in ISO-8601 format",
            "example" : "2023-01-01T10:00:00Z"
          },
          "units" : {
            "type" : "integer",
            "format" : "int32",
            "description" : "Number of resource units to book. Minimum value is 1.",
            "example" : 1,
            "minimum" : 1
          }
        },
        "required" : [ "answers", "eventTypeId", "start" ]
      },
      "CreateLoginTokenRequest" : {
        "type" : "object",
        "properties" : {
          "externalId" : {
            "type" : "string",
            "description" : "Id on an external system. Typically the user id on the tenant service side."
          }
        },
        "required" : [ "externalId" ]
      },
      "CreateTenantRequest" : {
        "type" : "object",
        "description" : "The tenant creation request containing the tenant ID and optional display name.",
        "properties" : {
          "id" : {
            "type" : "string",
            "description" : "Unique identifier for the tenant. Must be a valid slug consisting of lowercase letters, numbers, and hyphens.",
            "example" : "acme-corp",
            "maxLength" : 36,
            "minLength" : 3,
            "pattern" : "^[a-zà-ú0-9\\uD83C-\\uDBFF\\uDC00-\\uDFFF]+(?:-[a-zà-ú0-9\\uD83C-\\uDBFF\\uDC00-\\uDFFF]+)*$"
          },
          "name" : {
            "type" : "string",
            "description" : "Display name for the tenant. If not provided, the id will be used as the name.",
            "example" : "Acme Corporation"
          }
        },
        "required" : [ "id" ]
      },
      "EmailConfirmationCalendarEventNotification" : {
        "allOf" : [ {
          "$ref" : "#/components/schemas/CalendarEventNotification"
        }, {
          "type" : "object",
          "properties" : {
            "additionalInformation" : {
              "type" : "string",
              "description" : "Additional information to be appended to the notification.",
              "maxLength" : 1024,
              "minLength" : 0
            },
            "email" : {
              "type" : "string",
              "description" : "The email address of the receiver."
            },
            "id" : {
              "type" : "string",
              "format" : "uuid",
              "description" : "The notification id."
            },
            "locale" : {
              "type" : "string",
              "format" : "locale",
              "description" : "Locale to be used to send the notification."
            }
          }
        } ],
        "required" : [ "email", "id", "locale" ]
      },
      "EmailQuestion" : {
        "allOf" : [ {
          "$ref" : "#/components/schemas/EventTypeQuestion"
        }, {
          "type" : "object",
          "properties" : {
            "canBeDeleted" : {
              "type" : "boolean",
              "readOnly" : true
            }
          }
        } ],
        "required" : [ "id", "label" ]
      },
      "EvaluatedTimeSlotModel" : {
        "type" : "object",
        "description" : "Represents an available time slot with start and end times, preference score, and optional pricing information",
        "properties" : {
          "end" : {
            "type" : "string",
            "format" : "date-time",
            "description" : "End time of the slot in ISO-8601 format (UTC)",
            "example" : "2023-06-15T15:00:00Z"
          },
          "price" : {
            "$ref" : "#/components/schemas/MonetaryAmount",
            "description" : "Optional pricing information for booking this time slot"
          },
          "score" : {
            "type" : "number",
            "format" : "float",
            "description" : "Preference score for this time slot (higher values indicate more preferred slots)",
            "example" : 0.85
          },
          "start" : {
            "type" : "string",
            "format" : "date-time",
            "description" : "Start time of the slot in ISO-8601 format (UTC)",
            "example" : "2023-06-15T14:30:00Z"
          }
        },
        "required" : [ "end", "score", "start" ]
      },
      "EventInvitationReply" : {
        "type" : "object",
        "description" : "The invitation response details, including whether the invitation is accepted or declined and an optional comment",
        "discriminator" : {
          "propertyName" : "type"
        },
        "oneOf" : [ {
          "$ref" : "#/components/schemas/EventInvitationReplyAccept"
        }, {
          "$ref" : "#/components/schemas/EventInvitationReplyDecline"
        } ],
        "properties" : {
          "comment" : {
            "type" : "string"
          },
          "type" : {
            "type" : "string"
          }
        },
        "required" : [ "type" ]
      },
      "EventInvitationReplyAccept" : {
        "allOf" : [ {
          "$ref" : "#/components/schemas/EventInvitationReply"
        }, {
          "type" : "object",
          "properties" : {
            "comment" : {
              "type" : "string",
              "description" : "The response comment"
            }
          }
        } ],
        "description" : "Model for accepting a calendar event invitation. Used when an invitee confirms they will attend the event."
      },
      "EventInvitationReplyDecline" : {
        "allOf" : [ {
          "$ref" : "#/components/schemas/EventInvitationReply"
        }, {
          "type" : "object",
          "properties" : {
            "comment" : {
              "type" : "string",
              "description" : "The response comment"
            }
          }
        } ],
        "description" : "Model for declining a calendar event invitation. Used when an invitee indicates they will not attend the event."
      },
      "EventType" : {
        "type" : "object",
        "description" : "Represents a complete event type with all its settings and configuration. This model is returned when fetching existing event types and contains all the details that define how the event type behaves, appears, and integrates with other systems.",
        "properties" : {
          "afterBuffer" : {
            "type" : "string",
            "format" : "duration",
            "description" : "Buffer time added after each booking of this event type.",
            "example" : "PT15M"
          },
          "availableUnits" : {
            "type" : "integer",
            "format" : "int32",
            "description" : "For event types accepting multi-bookings, this sets the maximum number of people/resources that can book / be booked at the same time. Examples: \n- Restaurants: This is maximum number of people that can be attended at the same time.\n- Bikes store: This is the amount of bikes available.",
            "example" : 10
          },
          "beforeBuffer" : {
            "type" : "string",
            "format" : "duration",
            "description" : "Buffer time added before each booking of this event type.",
            "example" : "PT15M"
          },
          "bookingMode" : {
            "description" : "Defines how bookings are processed when created, determining whether they are automatically confirmed or require explicit confirmation.",
            "oneOf" : [ {
              "$ref" : "#/components/schemas/HoldBookingMode"
            }, {
              "$ref" : "#/components/schemas/InstantBookingMode"
            } ]
          },
          "busyIntervals" : {
            "type" : "array",
            "description" : "Set of specific time intervals during which this event type is considered busy.",
            "items" : {
              "$ref" : "#/components/schemas/InstantInterval"
            },
            "uniqueItems" : true
          },
          "description" : {
            "type" : "string",
            "description" : "A detailed description of the event type that helps bookers understand what to expect.",
            "example" : "Book a 30-minute session to discuss your project requirements and get expert advice."
          },
          "duration" : {
            "type" : "string",
            "format" : "duration",
            "description" : "It defines the duration of the event type.\nAllowed format is ISO-8601 duration, maximum unit allowed is days.",
            "example" : "PT1H"
          },
          "enabled" : {
            "type" : "boolean",
            "description" : "Controls whether this event type is active and available for booking. When false, no new bookings can be made."
          },
          "fullSlug" : {
            "type" : "string",
            "description" : "The complete URL slug including any user or team prefixes, used for constructing the full booking page URL.",
            "example" : "john/consultation"
          },
          "hosts" : {
            "type" : "array",
            "description" : "Set of users who have access to this event type, along with their roles and calendars.",
            "items" : {
              "$ref" : "#/components/schemas/EventTypeHost"
            },
            "uniqueItems" : true
          },
          "i18n" : {
            "$ref" : "#/components/schemas/EventTypeI18nConfig",
            "description" : "Configuration for internationalizing the event type content in multiple languages."
          },
          "id" : {
            "type" : "string",
            "format" : "uuid",
            "description" : "The unique identifier of the event type.",
            "example" : "123e4567-e89b-12d3-a456-426614174000"
          },
          "imageUrl" : {
            "type" : "string",
            "format" : "uri",
            "description" : "URL pointing to an image that represents this event type.",
            "example" : "https://example.com/images/consultation.jpg"
          },
          "location" : {
            "description" : "Defines where the event will take place.",
            "oneOf" : [ {
              "$ref" : "#/components/schemas/BookerPhoneLocation"
            }, {
              "$ref" : "#/components/schemas/BookerSelectionLocation"
            }, {
              "$ref" : "#/components/schemas/FixedLocation"
            }, {
              "$ref" : "#/components/schemas/GoogleMeetLocation"
            }, {
              "$ref" : "#/components/schemas/MicrosoftOutlookLocation"
            } ]
          },
          "maxBookingNotice" : {
            "type" : "string",
            "format" : "duration",
            "description" : "The maximum time in advance that a booking can be made.",
            "example" : "P30D"
          },
          "maxBookingsPerTimeUnit" : {
            "$ref" : "#/components/schemas/MaxBookingsPerTimeUnit",
            "description" : "Limits on the number of bookings that can be made within specific time periods."
          },
          "maxConcurrentBookings" : {
            "type" : "integer",
            "format" : "int32",
            "description" : "Limits how many concurrent bookings for this event type can happen at the same time. E.G, If it is set to 1, after one booking, the time slot is not available anymore. If null, then unlimited bookings can be made for the same time slot (unless 'availableUnits' is set).",
            "example" : 1
          },
          "maxUnitsPerBooking" : {
            "type" : "integer",
            "format" : "int32",
            "description" : "Whenever the 'availableUnits' is set, this sets the limit of how many 'units' can be booked per booking. Examples: \n- Restaurants: This the maximum party size that can make a reservation, for example, up to groups of 10 people max.\n- City tour: The maximum number of people that each of your tour guides can manage.",
            "example" : 5
          },
          "minBookingNotice" : {
            "type" : "string",
            "format" : "duration",
            "description" : "The minimum time required before a booking can be made.",
            "example" : "PT24H"
          },
          "minUnitsPerBooking" : {
            "type" : "integer",
            "format" : "int32",
            "description" : "The minimum number of units that can be booked in a single booking.",
            "example" : 1
          },
          "name" : {
            "type" : "string",
            "description" : "The name of the event type that is displayed to users.",
            "example" : "30-Minute Consultation"
          },
          "notifications" : {
            "$ref" : "#/components/schemas/BookingNotifications",
            "description" : "Configuration for notifications related to bookings of this event type."
          },
          "pricingPolicy" : {
            "$ref" : "#/components/schemas/LinkedPricingPolicy",
            "description" : "Reference to the pricing policy applied to bookings of this event type."
          },
          "questions" : {
            "type" : "array",
            "description" : "List of questions to be answered by the booker during the booking process.",
            "items" : {
              "oneOf" : [ {
                "$ref" : "#/components/schemas/EmailQuestion"
              }, {
                "$ref" : "#/components/schemas/ImageQuestion"
              }, {
                "$ref" : "#/components/schemas/LocationQuestion"
              }, {
                "$ref" : "#/components/schemas/PasswordQuestion"
              }, {
                "$ref" : "#/components/schemas/PhoneQuestion"
              }, {
                "$ref" : "#/components/schemas/TextQuestion"
              } ]
            }
          },
          "redirectAfterBooking" : {
            "$ref" : "#/components/schemas/AfterBookingRedirect",
            "description" : "Configuration for redirecting users to a specific URL after completing a booking."
          },
          "repeatingAvailability" : {
            "$ref" : "#/components/schemas/RepeatingAvailability",
            "description" : "Defines the regular weekly schedule when this event type is available for booking."
          },
          "resourceRules" : {
            "$ref" : "#/components/schemas/ResourceRules",
            "description" : "Rules for how resources should be allocated when bookings are made for this event type."
          },
          "slug" : {
            "type" : "string",
            "description" : "The URL-friendly identifier for this event type, used in booking page URLs.",
            "example" : "consultation"
          },
          "step" : {
            "type" : "string",
            "format" : "duration",
            "description" : "It defines increments for showing the availability slots, example:\n- An step of 15 minutes (PT15M) of a 1 hour meeting, will show as bookable slots: 10:00, 10:15, 10:30, 10:45... \n- An step of 1 hour (PT1H) of a 1 hour meeting, will show as bookable slots: 10:00, 11:00, 12:00, 13:00... \nAllowed format is ISO-8601 duration, maximum unit allowed is days.",
            "example" : "PT30M"
          },
          "tags" : {
            "type" : "object",
            "additionalProperties" : {
              "type" : "string"
            },
            "description" : "Custom metadata tags associated with this event type.",
            "example" : {
              "category" : "consultation",
              "department" : "sales"
            }
          },
          "thirdPartyCalendars" : {
            "$ref" : "#/components/schemas/ThirdPartyCalendars",
            "description" : "Configuration for integration with third-party calendar systems."
          },
          "unitsLabel" : {
            "type" : "string",
            "description" : "Units is a very generic concept, depending on the use case units could be referring to 'people', to 'bikes'... etc. The units label is to be able to set a custom label for the units field, that will appear in the booking page next to the 'units' selector.",
            "example" : "People"
          },
          "userId" : {
            "type" : "string",
            "format" : "uuid",
            "description" : "The user ID of the event type owner. The owner has full control over the event type.",
            "example" : "123e4567-e89b-12d3-a456-426614174000"
          },
          "workflows" : {
            "type" : "array",
            "description" : "List of workflows that are triggered for bookings of this event type.",
            "items" : {
              "$ref" : "#/components/schemas/AssociatedWorkflow"
            }
          }
        },
        "required" : [ "bookingMode", "busyIntervals", "duration", "enabled", "fullSlug", "hosts", "i18n", "id", "name", "notifications", "questions", "slug", "step", "tags", "thirdPartyCalendars", "userId", "workflows" ]
      },
      "EventTypeAvailabilityModel" : {
        "type" : "object",
        "description" : "Represents the availability information for an event type, including available time slots and booking configuration details",
        "properties" : {
          "availableUnits" : {
            "type" : "integer",
            "format" : "int32",
            "description" : "Total number of units available for booking",
            "example" : 10
          },
          "description" : {
            "type" : "string",
            "description" : "Optional description of the event type",
            "example" : "A brief consultation to discuss your project needs"
          },
          "eventTypeTags" : {
            "type" : "object",
            "additionalProperties" : {
              "type" : "string"
            },
            "description" : "Tags associated with this event type, as key-value pairs"
          },
          "eventTypeTimeZone" : {
            "type" : "string",
            "description" : "Default timezone for the event type",
            "example" : "America/New_York"
          },
          "i18n" : {
            "$ref" : "#/components/schemas/PublicEventTypeI18n",
            "description" : "Internationalization information for the event type"
          },
          "id" : {
            "type" : "string",
            "format" : "uuid",
            "description" : "Unique identifier of the event type",
            "example" : "123e4567-e89b-12d3-a456-426614174000"
          },
          "imageUrl" : {
            "type" : "string",
            "format" : "uri",
            "description" : "Optional URL to an image representing the event type",
            "example" : "https://example.com/images/consultation.jpg"
          },
          "maxConcurrentBookings" : {
            "type" : "integer",
            "format" : "int32",
            "description" : "Maximum number of concurrent bookings allowed for this event type",
            "example" : 5
          },
          "maxUnitsPerBooking" : {
            "type" : "integer",
            "format" : "int32",
            "description" : "Maximum number of units that can be booked in a single booking",
            "example" : 3
          },
          "name" : {
            "type" : "string",
            "description" : "Name of the event type",
            "example" : "30-Minute Consultation"
          },
          "questions" : {
            "type" : "array",
            "description" : "List of questions that need to be answered during the booking process",
            "items" : {
              "oneOf" : [ {
                "$ref" : "#/components/schemas/EmailQuestion"
              }, {
                "$ref" : "#/components/schemas/ImageQuestion"
              }, {
                "$ref" : "#/components/schemas/LocationQuestion"
              }, {
                "$ref" : "#/components/schemas/PasswordQuestion"
              }, {
                "$ref" : "#/components/schemas/PhoneQuestion"
              }, {
                "$ref" : "#/components/schemas/TextQuestion"
              } ]
            }
          },
          "redirectAfterBooking" : {
            "$ref" : "#/components/schemas/AfterBookingRedirect",
            "description" : "Configuration for redirecting users after completing a booking"
          },
          "timeSlots" : {
            "type" : "array",
            "description" : "Available time slots for booking, with start and end times, preference score, and optional pricing",
            "items" : {
              "$ref" : "#/components/schemas/EvaluatedTimeSlotModel"
            }
          },
          "unitsLabel" : {
            "type" : "string",
            "description" : "Label for the units being booked",
            "example" : "Seats"
          }
        },
        "required" : [ "eventTypeTags", "i18n", "id", "name", "questions", "timeSlots" ]
      },
      "EventTypeHost" : {
        "type" : "object",
        "description" : "Represents a user who has access to manage or collaborate on an event type. Hosts can have different roles which determine their permissions and may have associated calendars that are used for checking availability and syncing bookings.",
        "properties" : {
          "calendars" : {
            "type" : "array",
            "description" : "The set of calendars associated with this host that may be used for checking availability and/or synchronizing bookings.",
            "items" : {
              "$ref" : "#/components/schemas/EventTypeHostCalendar"
            },
            "uniqueItems" : true
          },
          "email" : {
            "type" : "string",
            "description" : "The email address of the host user. This is the primary identifier used for notifications and calendar integrations.",
            "example" : "john.doe@example.com"
          },
          "id" : {
            "type" : "string",
            "format" : "uuid",
            "description" : "The unique identifier of the host user.",
            "example" : "123e4567-e89b-12d3-a456-426614174000"
          },
          "role" : {
            "type" : "string",
            "description" : "The role assigned to this host, which determines their permissions and capabilities related to this event type.",
            "enum" : [ "OWNER", "COLLABORATOR" ]
          }
        },
        "required" : [ "calendars", "email", "id", "role" ]
      },
      "EventTypeHostCalendar" : {
        "type" : "object",
        "description" : "Represents a calendar associated with an event type host. These calendars can be used for checking availability conflicts and/or synchronizing new bookings, depending on the configuration.",
        "properties" : {
          "account" : {
            "type" : "string",
            "description" : "The identifier of the account within the provider, typically the user's email address associated with that calendar service.",
            "example" : "john.doe@example.com"
          },
          "description" : {
            "type" : "string",
            "description" : "An optional description of the calendar provided by the third-party calendar system.",
            "example" : "My primary work calendar"
          },
          "id" : {
            "type" : "string",
            "description" : "The unique identifier of the calendar.",
            "example" : "google-calendar-primary-123456"
          },
          "name" : {
            "type" : "string",
            "description" : "The display name of the calendar as it appears in the third-party calendar system.",
            "example" : "Work Calendar"
          },
          "primary" : {
            "type" : "boolean",
            "description" : "Indicates whether this is the user's primary/default calendar in the third-party service. Primary calendars often have special behavior in terms of notifications and visibility.",
            "example" : true
          },
          "provider" : {
            "type" : "string",
            "description" : "The name of the calendar provider service (e.g., 'google', 'office365').",
            "example" : "google"
          },
          "readOnly" : {
            "type" : "boolean",
            "description" : "Indicates whether the calendar is read-only. Read-only calendars can be used for checking availability but cannot have events created on them.",
            "example" : false
          },
          "syncBookings" : {
            "type" : "boolean",
            "description" : "When true, new bookings for this event type will be synchronized to this calendar, creating corresponding events.",
            "example" : true
          },
          "verifyAvailability" : {
            "type" : "boolean",
            "description" : "When true, existing events in this calendar will be considered when determining availability for new bookings, preventing double-booking.",
            "example" : true
          }
        },
        "required" : [ "account", "id", "name", "primary", "provider", "readOnly", "syncBookings", "verifyAvailability" ]
      },
      "EventTypeI18nConfig" : {
        "type" : "object",
        "description" : "Configuration for internationalization (i18n) of event type content. This model allows defining translations for various text fields of an event type, supporting multiple languages.",
        "properties" : {
          "description" : {
            "type" : "object",
            "additionalProperties" : {
              "type" : "string"
            },
            "description" : "Translations of the event type description in different languages. Keys are locale codes and values are the translated descriptions.",
            "example" : {
              "en" : "A brief meeting",
              "es" : "Una reunión breve",
              "fr" : "Une réunion courte"
            }
          },
          "name" : {
            "type" : "object",
            "additionalProperties" : {
              "type" : "string"
            },
            "description" : "Translations of the event type name in different languages. Keys are locale codes (e.g., 'en', 'es', 'fr') and values are the translated names.",
            "example" : {
              "en" : "Meeting",
              "es" : "Reunión",
              "fr" : "Réunion"
            }
          },
          "questions" : {
            "type" : "object",
            "additionalProperties" : {
              "$ref" : "#/components/schemas/QuestionI18nConfig"
            },
            "description" : "Map of questions i18n config by question id. This allows translating questions associated with the event type."
          }
        }
      },
      "EventTypeListItem" : {
        "type" : "object",
        "description" : "Basic information about an event type",
        "properties" : {
          "description" : {
            "type" : "string",
            "description" : "Optional detailed description of the event type",
            "example" : "A brief consultation to discuss your project requirements and provide initial guidance"
          },
          "fullSlug" : {
            "type" : "string",
            "description" : "The complete URL path for the event type, including owner information",
            "example" : "organization/team-name/consultation"
          },
          "id" : {
            "type" : "string",
            "format" : "uuid",
            "description" : "The unique identifier of the event type",
            "example" : "123e4567-e89b-12d3-a456-426614174000"
          },
          "name" : {
            "type" : "string",
            "description" : "The display name of the event type",
            "example" : "30-Minute Consultation"
          },
          "slug" : {
            "type" : "string",
            "description" : "The URL-friendly identifier for the event type, used in booking links",
            "example" : "consultation"
          },
          "userId" : {
            "type" : "string",
            "format" : "uuid",
            "description" : "The unique identifier of the user who owns this event type",
            "example" : "123e4567-e89b-12d3-a456-426614174001"
          }
        },
        "required" : [ "fullSlug", "id", "name", "slug", "userId" ]
      },
      "EventTypeQuestion" : {
        "type" : "object",
        "discriminator" : {
          "propertyName" : "type"
        },
        "properties" : {
          "canBeDeleted" : {
            "type" : "boolean"
          },
          "id" : {
            "type" : "string"
          },
          "label" : {
            "type" : "string"
          },
          "required" : {
            "type" : "boolean"
          },
          "type" : {
            "type" : "string"
          }
        },
        "required" : [ "id", "label", "type" ]
      },
      "EventTypesList" : {
        "type" : "object",
        "description" : "A collection of event types accessible to the authenticated user",
        "properties" : {
          "eventTypes" : {
            "type" : "array",
            "description" : "List of event types with their basic information",
            "items" : {
              "$ref" : "#/components/schemas/EventTypeListItem"
            }
          }
        },
        "required" : [ "eventTypes" ]
      },
      "ExternalBooking" : {
        "type" : "object",
        "description" : "The external booking details including event type, time interval, booker information, and other booking properties.",
        "properties" : {
          "answers" : {
            "type" : "object",
            "additionalProperties" : {
              "type" : "string"
            },
            "description" : "Answers to the event type questions. The keys should match the question identifiers defined in the event type, and the values are the answers provided by the booker.",
            "example" : {
              "question1" : "Answer to first question",
              "question2" : "Answer to second question"
            }
          },
          "bookerEmail" : {
            "type" : "string",
            "description" : "Email address of the person making the booking. This is used for identification and communication purposes.",
            "example" : "john.doe@example.com"
          },
          "confirmedAt" : {
            "type" : "string",
            "format" : "date-time",
            "description" : "Timestamp when the booking was confirmed. For external bookings, this can be set to record when the booking was originally confirmed in the external system.",
            "example" : "2023-05-10T09:30:00Z"
          },
          "eventTypeId" : {
            "type" : "string",
            "format" : "uuid",
            "description" : "The unique identifier of the event type this booking is associated with. The event type defines the booking's duration, questions, and other properties.",
            "example" : "550e8400-e29b-41d4-a716-446655440000"
          },
          "interval" : {
            "$ref" : "#/components/schemas/InstantInterval",
            "description" : "The time interval for the booking, specifying the start and end times. For external bookings, this can be any time interval regardless of availability constraints.",
            "example" : {
              "start" : "2023-05-15T14:00:00Z",
              "end" : "2023-05-15T15:00:00Z"
            }
          },
          "notes" : {
            "type" : "string",
            "description" : "Additional notes or comments about the booking. This can include special requests or any other relevant information.",
            "example" : "Please prepare the meeting room with a projector and whiteboard.",
            "maxLength" : 2048,
            "minLength" : 0
          },
          "price" : {
            "$ref" : "#/components/schemas/MonetaryAmount",
            "description" : "Price of the booking. This can be used to record the amount charged for the booking.",
            "example" : {
              "amount" : 100,
              "currency" : "USD"
            }
          },
          "resources" : {
            "type" : "array",
            "description" : "Resources associated with this booking. These are the specific resources being reserved or used for the booking.",
            "items" : {
              "$ref" : "#/components/schemas/UsedBookingResource"
            },
            "uniqueItems" : true
          },
          "units" : {
            "type" : "integer",
            "format" : "int32",
            "description" : "Number of units being booked. For most bookings this is 1, but can be higher for bookings that reserve multiple units of a resource.",
            "example" : 1,
            "minimum" : 1
          }
        },
        "required" : [ "eventTypeId", "interval" ]
      },
      "ExternalBookingAnsweredQuestionModel" : {
        "type" : "object",
        "properties" : {
          "answer" : {
            "type" : "string"
          },
          "id" : {
            "type" : "string"
          }
        },
        "required" : [ "id" ]
      },
      "ExternalBookingEventTypeModel" : {
        "type" : "object",
        "properties" : {
          "id" : {
            "type" : "string",
            "format" : "uuid"
          },
          "tags" : {
            "type" : "object",
            "additionalProperties" : {
              "type" : "string"
            }
          }
        },
        "required" : [ "id", "tags" ]
      },
      "ExternalBookingEventTypeOwnerModel" : {
        "type" : "object",
        "properties" : {
          "id" : {
            "type" : "string",
            "format" : "uuid"
          },
          "tags" : {
            "type" : "object",
            "additionalProperties" : {
              "type" : "string"
            }
          }
        },
        "required" : [ "id", "tags" ]
      },
      "ExternalBookingValidationModel" : {
        "type" : "object",
        "properties" : {
          "answeredQuestions" : {
            "type" : "array",
            "items" : {
              "$ref" : "#/components/schemas/ExternalBookingAnsweredQuestionModel"
            }
          },
          "eventType" : {
            "$ref" : "#/components/schemas/ExternalBookingEventTypeModel"
          },
          "eventTypeOwner" : {
            "$ref" : "#/components/schemas/ExternalBookingEventTypeOwnerModel"
          },
          "id" : {
            "type" : "string",
            "format" : "uuid"
          },
          "interval" : {
            "$ref" : "#/components/schemas/InstantInterval"
          },
          "units" : {
            "type" : "integer",
            "format" : "int32",
            "description" : "Booked units."
          }
        },
        "required" : [ "answeredQuestions", "eventType", "eventTypeOwner", "id", "interval" ]
      },
      "FixedLocation" : {
        "allOf" : [ {
          "$ref" : "#/components/schemas/Location"
        }, {
          "type" : "object",
          "properties" : {
            "freeText" : {
              "type" : "string",
              "description" : "Free-form text describing the physical location where the event will take place. This could be an address, building name, room number, or any other location description.",
              "example" : "Conference Room A, 123 Main Street, New York, NY 10001"
            }
          }
        } ],
        "description" : "Specifies a predetermined physical location for the event. This location is fixed and cannot be changed by the booker. It can be an address, room number, or any text description of where the event will take place.",
        "required" : [ "freeText" ]
      },
      "FixedLocationOption" : {
        "allOf" : [ {
          "$ref" : "#/components/schemas/LocationOption"
        }, {
          "type" : "object",
          "properties" : {
            "location" : {
              "type" : "string",
              "description" : "The free location string. It'll be used in communications such as SMS reminders, emails..."
            }
          }
        } ],
        "description" : "Represents a fixed physical location where the meeting or appointment will take place. This could be an office address, meeting room, or any other specified location."
      },
      "FixedPriceSpecification" : {
        "allOf" : [ {
          "$ref" : "#/components/schemas/PriceSpecification"
        }, {
          "type" : "object",
          "properties" : {
            "amount" : {
              "type" : "string",
              "description" : "Amount expressed in an string to avoid precisions loses.",
              "examples" : [ "12.45", "20" ]
            }
          }
        } ],
        "description" : "A simple pricing model where a fixed amount is charged regardless of duration or other factors. This is the most straightforward pricing model, suitable for services with a standard price.",
        "required" : [ "amount" ]
      },
      "FuzzyCalendarEventInvitationInterval" : {
        "allOf" : [ {
          "$ref" : "#/components/schemas/CalendarEventInvitationEvent"
        }, {
          "type" : "object",
          "properties" : {
            "date" : {
              "type" : "string",
              "format" : "date",
              "description" : "The date of the invitation, ISO 8601 format, YYYY-MM-DD"
            },
            "fuzzyTime" : {
              "type" : "string",
              "description" : "The fuzzy time for the invitation.\n * `MORNING` - From 08:00 to 12:00.\n * `AFTERNOON` - From 12:00 to 16:00.\n * `EVENING` - From 16:00 to 20:00.\n * `NIGHT` - From 20:00 onwards.\n",
              "enum" : [ "MORNING", "AFTERNOON", "EVENING", "NIGHT" ]
            },
            "timeZone" : {
              "type" : "string",
              "description" : "The time zone in which the time is specified. (Formatted as an IANA Time Zone Database name, e.g. \"Europe/Zurich\".)",
              "example" : "Europe/Madrid"
            }
          }
        } ],
        "required" : [ "date", "fuzzyTime", "timeZone" ]
      },
      "GetPublicEventTypeModel" : {
        "type" : "object",
        "description" : "Represents the public-facing information about an event type, containing only the details needed for the booking page. This model is optimized for public consumption and excludes sensitive configuration details that are only relevant to event type owners and administrators.",
        "properties" : {
          "availableUnits" : {
            "type" : "integer",
            "format" : "int32",
            "description" : "For event types accepting multi-bookings, this sets the maximum number of people/resources that can be booked at the same time.",
            "example" : 10
          },
          "description" : {
            "type" : "string",
            "description" : "A detailed description of the event type that helps bookers understand what to expect. This may be localized based on the requested locale.",
            "example" : "Book a 30-minute session to discuss your project requirements and get expert advice."
          },
          "eventTypeTags" : {
            "type" : "object",
            "additionalProperties" : {
              "type" : "string"
            },
            "description" : "Custom metadata tags associated with this event type. These may be used for displaying category information or other attributes on the booking page.",
            "example" : {
              "category" : "consultation",
              "department" : "sales"
            }
          },
          "eventTypeTimeZone" : {
            "type" : "string",
            "description" : "The timezone in which the event type's availability is defined. This helps users understand when slots are available in their local time.",
            "example" : "America/New_York"
          },
          "i18n" : {
            "$ref" : "#/components/schemas/PublicEventTypeI18n",
            "description" : "Internationalization information for the event type, indicating available languages and the currently displayed language."
          },
          "id" : {
            "type" : "string",
            "format" : "uuid",
            "description" : "The unique identifier of the event type.",
            "example" : "123e4567-e89b-12d3-a456-426614174000"
          },
          "imageUrl" : {
            "type" : "string",
            "format" : "uri",
            "description" : "URL pointing to an image that represents this event type.",
            "example" : "https://example.com/images/consultation.jpg"
          },
          "maxConcurrentBookings" : {
            "type" : "integer",
            "format" : "int32",
            "description" : "Controls how many concurrent bookings for this event type can happen at the same time. If null, then unlimited bookings can be made for the same time slot (unless 'availableUnits' is set).",
            "example" : 1
          },
          "maxUnitsPerBooking" : {
            "type" : "integer",
            "format" : "int32",
            "description" : "The maximum number of units that can be booked in a single booking when 'availableUnits' is set.",
            "example" : 5
          },
          "name" : {
            "type" : "string",
            "description" : "The name of the event type that is displayed to users. This may be localized based on the requested locale.",
            "example" : "30-Minute Consultation"
          },
          "questions" : {
            "type" : "array",
            "description" : "List of questions to be answered by the booker during the booking process. These questions collect information needed for the meeting.",
            "items" : {
              "oneOf" : [ {
                "$ref" : "#/components/schemas/EmailQuestion"
              }, {
                "$ref" : "#/components/schemas/ImageQuestion"
              }, {
                "$ref" : "#/components/schemas/LocationQuestion"
              }, {
                "$ref" : "#/components/schemas/PasswordQuestion"
              }, {
                "$ref" : "#/components/schemas/PhoneQuestion"
              }, {
                "$ref" : "#/components/schemas/TextQuestion"
              } ]
            }
          },
          "redirectAfterBooking" : {
            "$ref" : "#/components/schemas/AfterBookingRedirect",
            "description" : "Configuration for redirecting users to a specific URL after completing a booking."
          },
          "unitsLabel" : {
            "type" : "string",
            "description" : "Custom label for the units field that will appear in the booking page next to the units selector.",
            "example" : "People"
          }
        },
        "required" : [ "eventTypeTags", "i18n", "id", "name", "questions" ]
      },
      "GoogleCalendarCreateMeetBehavior" : {
        "type" : "object",
        "properties" : {
          "mode" : {
            "type" : "string",
            "description" : "Configures whether TimeTime will request google a new google meet link or not. \n * `ALWAYS` - Always creates a new google meet link.\n * `ONLY_IF_ONLINE_LOCATION_IS_NEEDED` - It will only add a new google meet link if the event type has the location configured to Google Meet. **Default**.\n * `NEVER` - Never creates a google meet link.\n\nNote that some emails might still be sent by google regardless of this configuration. ",
            "enum" : [ "ALWAYS", "ONLY_IF_ONLINE_LOCATION_IS_NEEDED", "NEVER" ]
          },
          "reuseOnlineConferenceIfPresent" : {
            "type" : "boolean",
            "description" : "When true, it will only add a new google meet link if no other workflow  has created an online conference yet."
          }
        }
      },
      "GoogleCalendarEventBookingNotification" : {
        "allOf" : [ {
          "$ref" : "#/components/schemas/AfterConfirmingBookingWorkflowAction"
        }, {
          "type" : "object",
          "properties" : {
            "addAttendees" : {
              "type" : "boolean",
              "default" : "true",
              "description" : "Whether to add the attendees to the calendar or not. If they are added, they might get notifications, based on the `guestNotificationsMode` field."
            },
            "addOrganizerAsAttendee" : {
              "type" : "boolean",
              "default" : "true",
              "description" : "Whether to add the organizer (the owner of the calendar) as an attendee or not. Not adding it is useful when the organizer sets up meetings for other people."
            },
            "calendarId" : {
              "type" : "string",
              "description" : "The Google calendar ID in which events will be inserted. The ID is not the raw Google calendar ID but the TimeTime version of it. It can be fetched with the user info endpoint.",
              "example" : "google-calendar-id-123456"
            },
            "colorId" : {
              "type" : "string",
              "description" : "The color ID for the calendar event. This corresponds to one of the predefined colors in Google Calendar.",
              "example" : 1
            },
            "createGoogleMeetBehavior" : {
              "$ref" : "#/components/schemas/GoogleCalendarCreateMeetBehavior",
              "description" : "Configuration for creating Google Meet conferences for calendar events. Controls when and how virtual meeting links are generated."
            },
            "extraEmailAttendees" : {
              "type" : "array",
              "description" : "A fixed list of additional email addresses that will always be added as attendees to the event. Useful for including stakeholders who should be aware of all meetings.",
              "example" : [ "manager@example.com", "assistant@example.com" ],
              "items" : {
                "type" : "string"
              },
              "uniqueItems" : true
            },
            "guestNotificationsMode" : {
              "type" : "string",
              "default" : "ALL",
              "description" : "Controls which notifications are sent to guests. Options include sending all notifications, only important ones, or none.",
              "enum" : [ "ALL", "EXTERNAL_ONLY", "NONE" ]
            },
            "guestsCanSeeOtherGuests" : {
              "type" : "boolean",
              "default" : "true",
              "description" : "Whether attendees other than the organizer can see who the event's attendees are. When false, attendees will only see the organizer in the event details."
            },
            "overlapMode" : {
              "type" : "string",
              "description" : "Determines how to handle overlapping events. When set to NEW_EVENT (default), a new event will be created regardless of overlaps.",
              "enum" : [ "NEW_EVENT", "UPDATE_ATTENDEES" ]
            }
          }
        } ],
        "description" : "Action that creates an event in Google Calendar when a booking is confirmed. This allows for automatic synchronization between TimeTime bookings and Google Calendar events, with customizable attendee management and meeting settings.",
        "required" : [ "calendarId", "overlapMode" ]
      },
      "GoogleCalendarOutOfOfficeBookingNotification" : {
        "allOf" : [ {
          "$ref" : "#/components/schemas/AfterConfirmingBookingWorkflowAction"
        }, {
          "type" : "object",
          "properties" : {
            "calendarId" : {
              "type" : "string",
              "description" : "The Google calendar ID in which the Out of Office event will be inserted. The ID is not the raw Google calendar ID but the TimeTime version of it. It can be fetched with the user info endpoint.",
              "example" : "google-calendar-id-123456"
            }
          }
        } ],
        "description" : "Action that creates an Out of Office (OOO) event in Google Calendar when a booking is confirmed. This is specifically designed for marking time as unavailable in a user's calendar.",
        "required" : [ "calendarId" ]
      },
      "GoogleConsentBody" : {
        "type" : "object",
        "properties" : {
          "authCode" : {
            "type" : "string"
          },
          "redirectUri" : {
            "type" : "string",
            "format" : "uri"
          }
        },
        "required" : [ "authCode" ]
      },
      "GoogleMeetLocation" : {
        "allOf" : [ {
          "$ref" : "#/components/schemas/Location"
        } ],
        "description" : "Specifies that the event will take place via Google Meet. A Google Meet link will be automatically generated and included in the calendar invitation. This creates a virtual meeting room that participants can join via browser or the Google Meet app."
      },
      "GoogleMeetLocationOption" : {
        "allOf" : [ {
          "$ref" : "#/components/schemas/LocationOption"
        } ],
        "description" : "Represents a Google Meet virtual meeting location. When this option is selected, the system will automatically create a Google Meet video conference link for the appointment."
      },
      "HoldBookingMode" : {
        "allOf" : [ {
          "$ref" : "#/components/schemas/BookingMode"
        }, {
          "type" : "object",
          "properties" : {
            "timeout" : {
              "type" : "string",
              "format" : "duration",
              "description" : "The maximum duration a booking can remain in the hold state before automatic cancellation. This timeout period starts when the booking is initially created and is specified in ISO 8601 duration format. If the booking is not explicitly confirmed before this timeout expires, the system will automatically cancel it and release all reserved resources.",
              "example" : "PT30M"
            }
          }
        } ],
        "description" : "Specifies that bookings should initially be placed in a 'hold' state before being confirmed. When a booking is on hold, all associated resources are marked as busy to prevent double-booking, but the booking requires explicit confirmation through an API call before being finalized. This mode is designed for enterprise integrations that need to perform additional actions (like payment processing or approval workflows) before confirming a booking. If not confirmed within the specified timeout period, held bookings are automatically canceled and resources are released.",
        "required" : [ "timeout" ]
      },
      "ImageQuestion" : {
        "allOf" : [ {
          "$ref" : "#/components/schemas/EventTypeQuestion"
        }, {
          "type" : "object",
          "properties" : {
            "canBeDeleted" : {
              "type" : "boolean",
              "readOnly" : true
            }
          }
        } ],
        "required" : [ "id", "label" ]
      },
      "InstantBookingMode" : {
        "allOf" : [ {
          "$ref" : "#/components/schemas/BookingMode"
        } ],
        "description" : "Specifies that bookings should be confirmed immediately upon creation without requiring any additional confirmation steps. This mode provides the simplest user experience where slots are reserved instantly without a pending or hold state."
      },
      "InstantInterval" : {
        "type" : "object",
        "description" : "Represents an absolute time interval defined by start and end points in UTC. Unlike ZonedDateTimeInterval, this model uses Instant values which are timezone-independent and represent specific points on the global timeline. This is useful for defining precise time periods that should remain fixed regardless of the user's local timezone.",
        "properties" : {
          "end" : {
            "type" : "string",
            "format" : "date-time",
            "description" : "The ending point of the interval as an ISO 8601 timestamp in UTC. This represents the exact moment when the interval ends, regardless of local timezone. The end must be later than the start time.",
            "example" : "2023-06-15T16:30:00Z"
          },
          "start" : {
            "type" : "string",
            "format" : "date-time",
            "description" : "The starting point of the interval as an ISO 8601 timestamp in UTC. This represents the exact moment when the interval begins, regardless of local timezone.",
            "example" : "2023-06-15T14:30:00Z"
          }
        },
        "required" : [ "end", "start" ]
      },
      "InviteOrganizationMember" : {
        "type" : "object",
        "description" : "The invitation details including the email address and roles for the new member",
        "properties" : {
          "email" : {
            "type" : "string",
            "description" : "The email address of the user to invite. Must be a valid email format.",
            "example" : "user@example.com"
          },
          "roles" : {
            "type" : "array",
            "description" : "The set of roles to assign to the user upon acceptance of the invitation. If not provided, the default 'MEMBER' role will be assigned.",
            "example" : [ "MEMBER", "ADMIN" ],
            "items" : {
              "type" : "string",
              "description" : "Represents the role of a user within an organization, which determines their permissions and access rights",
              "enum" : [ "MEMBER", "ADMIN" ]
            },
            "uniqueItems" : true
          }
        },
        "required" : [ "email", "roles" ]
      },
      "LinkedPricingPolicy" : {
        "type" : "object",
        "description" : "A lightweight representation of a pricing policy that is linked to another resource, such as an event type. This model provides essential identifying information without including the full pricing policy details. It contains just enough information to display the association in user interfaces, while allowing clients to fetch complete details if needed through dedicated pricing policy endpoints.",
        "properties" : {
          "id" : {
            "type" : "string",
            "format" : "uuid",
            "description" : "The unique identifier of the pricing policy. This ID can be used to fetch the complete pricing policy details through dedicated endpoints.",
            "example" : "123e4567-e89b-12d3-a456-426614174000"
          },
          "name" : {
            "type" : "string",
            "description" : "The human-readable name of the pricing policy. This can be displayed in user interfaces to help identify the pricing policy without needing to fetch the complete details.",
            "example" : "Standard Rate"
          }
        },
        "required" : [ "id", "name" ]
      },
      "ListUsersResponse" : {
        "type" : "object",
        "description" : "Response model containing a list of user profiles",
        "properties" : {
          "users" : {
            "type" : "array",
            "description" : "Collection of user profiles with their details",
            "items" : {
              "$ref" : "#/components/schemas/User"
            }
          }
        },
        "required" : [ "users" ]
      },
      "Location" : {
        "type" : "object",
        "description" : "Defines where the event will take place. Different location types support various forms of meeting settings including virtual meetings, phone calls, or physical locations. The location affects how participants connect during the scheduled event and may appear in calendar invitations.",
        "discriminator" : {
          "propertyName" : "type"
        },
        "properties" : {
          "type" : {
            "type" : "string"
          }
        },
        "required" : [ "type" ]
      },
      "LocationOption" : {
        "type" : "object",
        "description" : "Base type for different location options that can be configured for an event type. Location options determine where the meeting or appointment will take place, such as a physical address, virtual meeting, or phone call.",
        "discriminator" : {
          "propertyName" : "type"
        },
        "properties" : {
          "type" : {
            "type" : "string"
          }
        },
        "required" : [ "type" ]
      },
      "LocationQuestion" : {
        "allOf" : [ {
          "$ref" : "#/components/schemas/EventTypeQuestion"
        }, {
          "type" : "object",
          "properties" : {
            "allowedOptions" : {
              "type" : "array",
              "items" : {
                "oneOf" : [ {
                  "$ref" : "#/components/schemas/BookerPhoneOption"
                }, {
                  "$ref" : "#/components/schemas/FixedLocationOption"
                }, {
                  "$ref" : "#/components/schemas/GoogleMeetLocationOption"
                }, {
                  "$ref" : "#/components/schemas/MicrosoftOutlookOption"
                } ]
              },
              "uniqueItems" : true
            },
            "canBeDeleted" : {
              "type" : "boolean",
              "readOnly" : true
            }
          }
        } ],
        "required" : [ "allowedOptions", "id", "label" ]
      },
      "LoginToken" : {
        "type" : "object",
        "properties" : {
          "token" : {
            "type" : "string",
            "description" : "The temporary token that can be used for login the user."
          }
        },
        "required" : [ "token" ]
      },
      "MaxBookingsPerTimeUnit" : {
        "type" : "object",
        "description" : "Defines limits on the number of bookings that can be created within specific time periods. These constraints help manage booking density and prevent overbooking scenarios. The time units are calculated based on natural calendar periods (hours, days, weeks, months) considering the event and user timezone settings.",
        "properties" : {
          "perDay" : {
            "type" : "integer",
            "format" : "int32",
            "description" : "Maximum number of bookings allowed per natural day (midnight to midnight). The start of the day is calculated considering the event and user's timezone settings. For example, setting this to 10 would allow at most 10 bookings per calendar day.",
            "example" : 10,
            "minimum" : 1
          },
          "perHour" : {
            "type" : "integer",
            "format" : "int32",
            "description" : "Maximum number of bookings allowed per natural hour. For example, setting this to 3 would allow at most 3 bookings to be created with start times between 9:00-9:59, regardless of their duration.",
            "example" : 3,
            "minimum" : 1
          },
          "perMonth" : {
            "type" : "integer",
            "format" : "int32",
            "description" : "Maximum number of bookings allowed per natural month. The starting hour for the first day of the month is calculated considering the event and user's timezone settings. For example, setting this to 80 would allow at most 80 bookings to be created with start times within the same calendar month.",
            "example" : 80,
            "minimum" : 1
          },
          "perWeek" : {
            "type" : "integer",
            "format" : "int32",
            "description" : "Maximum number of bookings allowed per natural week, starting on Monday. The exact start time is calculated considering the event and user's timezone settings. For example, setting this to 30 would allow at most 30 bookings to be created with start times within the same calendar week.",
            "example" : 30,
            "minimum" : 1
          }
        }
      },
      "MicrosoftOutlookLocation" : {
        "allOf" : [ {
          "$ref" : "#/components/schemas/Location"
        } ],
        "description" : "Specifies that the event will take place via Microsoft Teams. A Microsoft Teams meeting link will be automatically generated and included in the calendar invitation. This creates a virtual meeting room that participants can join via browser or the Microsoft Teams app."
      },
      "MicrosoftOutlookOption" : {
        "allOf" : [ {
          "$ref" : "#/components/schemas/LocationOption"
        } ],
        "description" : "Represents a Microsoft Teams virtual meeting location created through Outlook. When this option is selected, the system will automatically create a Microsoft Teams video conference link for the appointment."
      },
      "MonetaryAmount" : {
        "type" : "object",
        "description" : "Represents a monetary value with a specified currency. This model is used throughout the API for all financial values such as prices, fees, and discounts. The combination of currency and amount defines the exact monetary value, and all calculations maintain precision to avoid rounding errors.",
        "properties" : {
          "amount" : {
            "type" : "string",
            "description" : "The numeric value of the monetary amount, expressed as a string to preserve precision and avoid floating-point errors. This can include decimal places appropriate for the specified currency.",
            "example" : 12.45,
            "examples" : [ "12.45", "20", "499.99", "1000.00" ]
          },
          "currency" : {
            "type" : "string",
            "description" : "The ISO 4217 currency code that identifies the currency of this monetary amount. This determines the currency symbol and formatting rules when displaying the amount.",
            "example" : "EUR",
            "examples" : [ "EUR", "USD" ]
          }
        },
        "required" : [ "amount", "currency" ]
      },
      "Organization" : {
        "type" : "object",
        "description" : "Represents an organization in the system, which can contain members, resources, and other entities",
        "properties" : {
          "domain" : {
            "type" : "string",
            "description" : "The domain associated with the organization, often used for email validation or SSO",
            "example" : "acme.com"
          },
          "id" : {
            "type" : "string",
            "format" : "uuid",
            "description" : "The unique identifier of the organization",
            "example" : "123e4567-e89b-12d3-a456-426614174000"
          },
          "image" : {
            "type" : "string",
            "format" : "uri",
            "description" : "URL to the organization's logo or image",
            "example" : "https://example.com/logo.png"
          },
          "name" : {
            "type" : "string",
            "description" : "The name of the organization",
            "example" : "Acme Corporation"
          },
          "tags" : {
            "type" : "object",
            "additionalProperties" : {
              "type" : "string"
            },
            "description" : "Custom metadata for the organization as key-value pairs",
            "example" : {
              "industry" : "technology",
              "size" : "enterprise"
            }
          },
          "webhooks" : {
            "type" : "array",
            "description" : "Configuration for webhook endpoints that will receive organization-related events",
            "items" : {
              "$ref" : "#/components/schemas/WebhookDeliveryConfig"
            },
            "uniqueItems" : true
          }
        },
        "required" : [ "id", "name", "tags", "webhooks" ]
      },
      "OrganizationMember" : {
        "type" : "object",
        "description" : "Represents a user who is a member of an organization, including their roles and permissions",
        "properties" : {
          "email" : {
            "type" : "string",
            "description" : "The email address of the user",
            "example" : "user@example.com"
          },
          "id" : {
            "type" : "string",
            "format" : "uuid",
            "description" : "The unique identifier of the user",
            "example" : "123e4567-e89b-12d3-a456-426614174000"
          },
          "roles" : {
            "type" : "array",
            "description" : "The set of roles assigned to the user within the organization",
            "items" : {
              "type" : "string",
              "description" : "Represents the role of a user within an organization, which determines their permissions and access rights",
              "enum" : [ "MEMBER", "ADMIN" ]
            },
            "uniqueItems" : true
          }
        },
        "required" : [ "email", "id", "roles" ]
      },
      "OrganizationMembersList" : {
        "type" : "object",
        "description" : "A collection of members belonging to an organization",
        "properties" : {
          "members" : {
            "type" : "array",
            "description" : "List of users who are members of the organization",
            "items" : {
              "$ref" : "#/components/schemas/OrganizationMember"
            }
          }
        },
        "required" : [ "members" ]
      },
      "OrganizationMembership" : {
        "type" : "object",
        "description" : "Represents a user's membership in an organization, including their roles and permissions",
        "properties" : {
          "organizationId" : {
            "type" : "string",
            "format" : "uuid",
            "description" : "The unique identifier of the organization",
            "example" : "123e4567-e89b-12d3-a456-426614174000"
          },
          "roles" : {
            "type" : "array",
            "description" : "The set of roles the user has within the organization",
            "items" : {
              "type" : "string",
              "description" : "Represents the role of a user within an organization, which determines their permissions and access rights",
              "enum" : [ "MEMBER", "ADMIN" ]
            },
            "uniqueItems" : true
          }
        },
        "required" : [ "organizationId", "roles" ]
      },
      "OrganizationResourceCollaborator" : {
        "allOf" : [ {
          "$ref" : "#/components/schemas/ResourceCollaborator"
        }, {
          "type" : "object",
          "properties" : {
            "organizationId" : {
              "type" : "string",
              "format" : "uuid"
            }
          }
        } ],
        "description" : "Making an 'organization' collaborator of a resource means that members of that org can see the resource and use it for configuring their services. Example: including the resource for a round robbin availability.As of now, there is no strict control of what members of the org can do, all of them will see the resource and they will be able to link it to their services. Modifying/Deleting the resource won't be allowed for them.",
        "required" : [ "organizationId" ]
      },
      "OrganizationsList" : {
        "type" : "object",
        "description" : "A collection of organizations accessible to the authenticated user",
        "properties" : {
          "organizations" : {
            "type" : "array",
            "description" : "List of organizations with their details",
            "items" : {
              "$ref" : "#/components/schemas/Organization"
            }
          }
        },
        "required" : [ "organizations" ]
      },
      "PasswordQuestion" : {
        "allOf" : [ {
          "$ref" : "#/components/schemas/EventTypeQuestion"
        }, {
          "type" : "object",
          "properties" : {
            "canBeDeleted" : {
              "type" : "boolean",
              "readOnly" : true
            }
          }
        } ],
        "required" : [ "id", "label" ]
      },
      "PatchBookingBody" : {
        "type" : "object",
        "description" : "Request body for updating a booking",
        "properties" : {
          "privateNotes" : {
            "type" : "array",
            "description" : "Optional set of private notes to associate with the booking. These notes are visible only to the booking owner and organization administrators.",
            "example" : [ "Discussed project timeline", "Client prefers morning meetings" ],
            "items" : {
              "type" : "string"
            },
            "uniqueItems" : true
          }
        },
        "required" : [ "privateNotes" ]
      },
      "PatchOrganizationMembership" : {
        "type" : "object",
        "properties" : {
          "roles" : {
            "type" : "array",
            "items" : {
              "type" : "string",
              "description" : "Represents the role of a user within an organization, which determines their permissions and access rights",
              "enum" : [ "MEMBER", "ADMIN" ]
            },
            "uniqueItems" : true
          }
        },
        "required" : [ "roles" ]
      },
      "PatchTenantMembershipModel" : {
        "type" : "object",
        "description" : "Model for updating a user's membership properties within a tenant. This allows changing a user's role and permissions within the tenant.",
        "properties" : {
          "role" : {
            "type" : "string",
            "description" : "The role to assign to the user within the tenant. This determines the user's permissions and access level.",
            "enum" : [ "MEMBER", "ADMIN" ],
            "example" : "ADMIN"
          }
        },
        "required" : [ "role" ]
      },
      "PatchTenantRequest" : {
        "type" : "object",
        "description" : "The tenant update request containing the properties to modify. All fields are optional - only the provided fields will be updated.",
        "properties" : {
          "name" : {
            "type" : "string",
            "description" : "Display name for the tenant. This is the human-readable name shown in the UI and used for branding purposes.",
            "example" : "Acme Corporation"
          },
          "webAppConfig" : {
            "type" : "object",
            "additionalProperties" : {
              "type" : "object"
            },
            "description" : "Free-form JSON object for custom web application configuration. This can store tenant-specific settings, UI customizations, feature flags, or any other configuration needed by the web application. The structure is flexible and depends on the specific needs of your implementation.",
            "example" : {
              "theme" : "light",
              "features" : {
                "advancedBooking" : true
              },
              "defaultLocale" : "en-US"
            }
          },
          "webhooks" : {
            "type" : "array",
            "description" : "Global webhooks for the tenant. These webhooks receive notifications for all tenant-wide events and can be used to integrate with external systems. Webhooks defined here apply to all resources and users within the tenant.",
            "items" : {
              "$ref" : "#/components/schemas/WebhookDeliveryConfig"
            },
            "uniqueItems" : true
          }
        }
      },
      "PatchUserModel" : {
        "type" : "object",
        "description" : "The user update request containing the properties to modify",
        "properties" : {
          "tenant" : {
            "$ref" : "#/components/schemas/PatchTenantMembershipModel",
            "description" : "Tenant-specific properties to update for the user, such as their role within the tenant."
          }
        },
        "required" : [ "tenant" ]
      },
      "PhoneQuestion" : {
        "allOf" : [ {
          "$ref" : "#/components/schemas/EventTypeQuestion"
        }, {
          "type" : "object",
          "properties" : {
            "canBeDeleted" : {
              "type" : "boolean",
              "readOnly" : true
            }
          }
        } ],
        "required" : [ "id", "label" ]
      },
      "PostUserBody" : {
        "type" : "object",
        "description" : "The user details to create",
        "properties" : {
          "email" : {
            "type" : "string",
            "description" : "The email address of the user to create. Must be a valid email format.",
            "example" : "user@example.com"
          },
          "externalId" : {
            "type" : "string",
            "description" : "Optional identifier from an external system. Used to link the TimeTime user with a user in an external system.",
            "example" : "ext_12345"
          }
        },
        "required" : [ "email" ]
      },
      "PriceSpecification" : {
        "type" : "object",
        "description" : "Represents how a price is calculated for a service or product. TimeTime supports different pricing models through this abstraction, including fixed prices and tiered pricing based on duration. The specific type of price specification is determined by the 'type' field.",
        "discriminator" : {
          "propertyName" : "type"
        },
        "properties" : {
          "type" : {
            "type" : "string"
          }
        },
        "required" : [ "type" ]
      },
      "PricingPolicesList" : {
        "type" : "object",
        "description" : "Represents a collection of pricing policies that the authenticated user has access to. This model is typically returned when listing all available pricing policies and includes comprehensive details about each policy.",
        "properties" : {
          "items" : {
            "type" : "array",
            "description" : "List of pricing policies with their complete details including name, currency, price specifications, and any conditional overrides",
            "items" : {
              "$ref" : "#/components/schemas/PricingPolicy"
            }
          }
        },
        "required" : [ "items" ]
      },
      "PricingPolicy" : {
        "type" : "object",
        "description" : "A pricing policy defines how services or products are priced, including base prices and any conditional overrides. Pricing policies can be owned by users or organizations and can be applied to event types or other bookable resources. Each policy includes a default price specification and optional conditional overrides based on specific rules.",
        "properties" : {
          "currency" : {
            "type" : "string",
            "description" : "ISO 4217 Currency code",
            "example" : "EUR",
            "examples" : [ "EUR", "USD" ]
          },
          "id" : {
            "type" : "string",
            "format" : "uuid",
            "description" : "Unique identifier of the pricing policy",
            "example" : "123e4567-e89b-12d3-a456-426614174000"
          },
          "name" : {
            "type" : "string",
            "description" : "Name of the pricing policy",
            "example" : "Standard Rate Plan"
          },
          "overrides" : {
            "type" : "array",
            "description" : "List of conditional pricing overrides that modify the base price under specific conditions or rules",
            "items" : {
              "$ref" : "#/components/schemas/PricingPolicyOverride"
            }
          },
          "owner" : {
            "description" : "The owner of this pricing policy, which can be either a user or an organization",
            "oneOf" : [ {
              "$ref" : "#/components/schemas/PricingPolicyOwnerOrg"
            }, {
              "$ref" : "#/components/schemas/PricingPolicyOwnerUser"
            } ]
          },
          "priceSpecification" : {
            "description" : "Default price specification that applies when no overrides match",
            "oneOf" : [ {
              "$ref" : "#/components/schemas/FixedPriceSpecification"
            }, {
              "$ref" : "#/components/schemas/TieredPriceSpecification"
            } ]
          },
          "tags" : {
            "type" : "object",
            "additionalProperties" : {
              "type" : "string"
            },
            "description" : "Arbitrary key/value collection. Useful for API users to store metadata."
          }
        },
        "required" : [ "currency", "id", "name", "overrides", "owner", "priceSpecification" ]
      },
      "PricingPolicyId" : {
        "type" : "object",
        "description" : "A reference to a pricing policy using its unique identifier. This model is used when only the ID of a pricing policy is needed, without including the full policy details.",
        "properties" : {
          "id" : {
            "type" : "string",
            "format" : "uuid",
            "description" : "The unique identifier of the pricing policy. This ID can be used to fetch the complete pricing policy details through dedicated endpoints.",
            "example" : "123e4567-e89b-12d3-a456-426614174000"
          }
        },
        "required" : [ "id" ]
      },
      "PricingPolicyOverride" : {
        "type" : "object",
        "description" : "Represents a conditional override for a pricing policy. Overrides allow different pricing to be applied based on specific conditions or rules, such as time of day, day of week, or special dates. When the conditions specified in the rules are met, the override price specification is used instead of the default.",
        "properties" : {
          "name" : {
            "type" : "string",
            "description" : "Name of this pricing override, used for identification and display purposes",
            "example" : "Evening Rates"
          },
          "priceSpecification" : {
            "description" : "The price specification to use when this override's conditions are met",
            "oneOf" : [ {
              "$ref" : "#/components/schemas/FixedPriceSpecification"
            }, {
              "$ref" : "#/components/schemas/TieredPriceSpecification"
            } ]
          },
          "rules" : {
            "$ref" : "#/components/schemas/PricingPolicyOverrideRules",
            "description" : "Rules that determine when this override applies"
          },
          "tags" : {
            "type" : "object",
            "additionalProperties" : {
              "type" : "string"
            },
            "description" : "Arbitrary key/value collection. Useful for API users to store metadata."
          }
        },
        "required" : [ "name", "priceSpecification", "rules" ]
      },
      "PricingPolicyOverrideRules" : {
        "type" : "object",
        "description" : "Defines the conditions under which a pricing policy override applies. These rules use RFC-5545 calendar format to specify complex time-based conditions that determine when an override price should be used.",
        "properties" : {
          "schedule" : {
            "type" : "string",
            "description" : "\nAn RFC-5545 calendar to specify when this override matches.\n\nWhen modeling price specifications, it's usual to see some kind of restrictions/exceptions stamped in the form\nof \"validFrom\" and \"validUntil\". But those are not enough to model some of the real world price specs such as\n\n* This price applies every week day from 7pm till 9pm\"\n* This price applies every New Year's Eve\n\nSo, for that, in TimeTime we decided to use the standard to communicate those complex rules, and the existing\nRFC-5545 ICS covers all these cases.\n\nWe'll use that to calculate a price, if there is an event (or an instance of a recurring event) happening in\nthe evaluated time interval, the override price will be applied.\n        ",
            "example" : "DTSTART:20230101T000000Z\nRRULE:FREQ=WEEKLY;BYDAY=MO,TU,WE,TH,FR;BYHOUR=19,20;BYMINUTE=0"
          }
        },
        "required" : [ "schedule" ]
      },
      "PricingPolicyOwner" : {
        "type" : "object",
        "description" : "Represents the owner of a pricing policy, which can be either an organization or a user. The owner has full control over the pricing policy, including the ability to modify or delete it. The type field determines whether this is an organization-owned or user-owned policy.",
        "discriminator" : {
          "mapping" : {
            "PricingPolicyOwnerOrg" : "#/components/schemas/PricingPolicyOwnerOrg",
            "PricingPolicyOwnerUser" : "#/components/schemas/PricingPolicyOwnerUser"
          },
          "propertyName" : "type"
        },
        "properties" : {
          "type" : {
            "type" : "string"
          }
        },
        "required" : [ "type" ]
      },
      "PricingPolicyOwnerOrg" : {
        "allOf" : [ {
          "$ref" : "#/components/schemas/PricingPolicyOwner"
        }, {
          "type" : "object",
          "properties" : {
            "id" : {
              "type" : "string",
              "format" : "uuid",
              "description" : "Unique identifier of the organization that owns this pricing policy",
              "example" : "123e4567-e89b-12d3-a456-426614174000"
            }
          }
        } ],
        "description" : "Represents an organization that owns a pricing policy. Organization-owned pricing policies can be accessed and used by members of the organization according to their permissions.",
        "required" : [ "id" ]
      },
      "PricingPolicyOwnerUser" : {
        "allOf" : [ {
          "$ref" : "#/components/schemas/PricingPolicyOwner"
        }, {
          "type" : "object",
          "properties" : {
            "id" : {
              "type" : "string",
              "format" : "uuid",
              "description" : "Unique identifier of the user who owns this pricing policy",
              "example" : "123e4567-e89b-12d3-a456-426614174000"
            }
          }
        } ],
        "description" : "Represents a user who owns a pricing policy. User-owned pricing policies are private to that user and cannot be accessed by others unless explicitly shared.",
        "required" : [ "id" ]
      },
      "ProblemDetail" : {
        "type" : "object",
        "properties" : {
          "detail" : {
            "type" : "string"
          },
          "instance" : {
            "type" : "string",
            "format" : "uri"
          },
          "properties" : {
            "type" : "object",
            "additionalProperties" : {
              "type" : "object"
            }
          },
          "status" : {
            "type" : "integer",
            "format" : "int32"
          },
          "title" : {
            "type" : "string"
          },
          "type" : {
            "type" : "string",
            "format" : "uri"
          }
        }
      },
      "PublicBooking" : {
        "type" : "object",
        "description" : "Represents a booking that is publicly accessible, containing details about the scheduled event, participants, and status. This model is designed for sharing booking information with end users who may not have TimeTime accounts.",
        "properties" : {
          "answeredQuestions" : {
            "type" : "array",
            "items" : {
              "$ref" : "#/components/schemas/AnsweredQuestion"
            }
          },
          "bookedResources" : {
            "type" : "array",
            "items" : {
              "$ref" : "#/components/schemas/BookedResource"
            },
            "uniqueItems" : true
          },
          "booker" : {
            "$ref" : "#/components/schemas/Booker"
          },
          "cancellation" : {
            "$ref" : "#/components/schemas/BookingCancellationModel",
            "description" : "Not null if the booking has been cancelled."
          },
          "conferenceLink" : {
            "type" : "string",
            "format" : "uri"
          },
          "confirmedAt" : {
            "type" : "string",
            "format" : "date-time"
          },
          "eventType" : {
            "$ref" : "#/components/schemas/BookedEventType"
          },
          "heldUntil" : {
            "type" : "string",
            "format" : "date-time"
          },
          "id" : {
            "type" : "string",
            "format" : "uuid"
          },
          "interval" : {
            "$ref" : "#/components/schemas/InstantInterval"
          },
          "notes" : {
            "type" : "string",
            "description" : "Additional notes added by the booker when submitting the booking."
          },
          "price" : {
            "$ref" : "#/components/schemas/MonetaryAmount"
          },
          "privateNotes" : {
            "type" : "array",
            "items" : {
              "type" : "string"
            },
            "uniqueItems" : true
          },
          "status" : {
            "type" : "string",
            "description" : "Booking status.\n * `CONFIRMED` - Booking is confirmed.\n * `ON_HOLD` - Booking is on hold, this means the slot and the related resources are blocked till the hold is released.\n * `CANCELED` - Booking has been canceled.",
            "enum" : [ "CONFIRMED", "ON_HOLD", "CANCELED" ]
          },
          "units" : {
            "type" : "integer",
            "format" : "int32",
            "description" : "Booked units."
          }
        },
        "required" : [ "answeredQuestions", "bookedResources", "booker", "eventType", "id", "interval", "privateNotes", "status" ]
      },
      "PublicEventTypeI18n" : {
        "type" : "object",
        "description" : "Provides internationalization information for the public view of an event type. This model indicates which languages are available for the event type content and which language is currently being displayed.",
        "properties" : {
          "availableLocales" : {
            "type" : "array",
            "description" : "The set of locale codes for which translations are available for this event type. Clients can use this to offer language selection options to users.",
            "example" : [ "en", "es", "fr" ],
            "items" : {
              "type" : "string",
              "format" : "locale"
            },
            "uniqueItems" : true
          },
          "currentLocale" : {
            "type" : "string",
            "format" : "locale",
            "description" : "The locale code of the language currently being displayed. This may be null if using the default language or if no specific locale was requested.",
            "example" : "en"
          }
        },
        "required" : [ "availableLocales" ]
      },
      "PublicInvitedAttendee" : {
        "type" : "object",
        "description" : "Information about an attendee who has been invited to an event, including their response status",
        "properties" : {
          "comment" : {
            "type" : "string",
            "description" : "Optional comment provided by the attendee when responding to the invitation",
            "example" : "I'll be joining remotely"
          },
          "status" : {
            "type" : "string",
            "description" : "The attendee's response status to the invitation (accepted, declined, tentative, etc.)",
            "enum" : [ "NEEDS_ACTION", "DECLINED", "TENTATIVE", "ACCEPTED" ]
          }
        },
        "required" : [ "status" ]
      },
      "PublicProfile" : {
        "type" : "object",
        "properties" : {
          "description" : {
            "type" : "string"
          },
          "id" : {
            "type" : "string",
            "format" : "uuid"
          },
          "imageUrl" : {
            "type" : "string",
            "format" : "uri"
          },
          "links" : {
            "type" : "array",
            "items" : {
              "$ref" : "#/components/schemas/PublicProfileLink"
            }
          },
          "name" : {
            "type" : "string"
          },
          "owner" : {
            "oneOf" : [ {
              "$ref" : "#/components/schemas/PublicProfileOwnerOrg"
            }, {
              "$ref" : "#/components/schemas/PublicProfileOwnerUser"
            } ]
          },
          "slug" : {
            "type" : "string"
          },
          "tags" : {
            "type" : "object",
            "additionalProperties" : {
              "type" : "string"
            }
          }
        },
        "required" : [ "id", "name", "owner", "slug" ]
      },
      "PublicProfileLink" : {
        "type" : "object",
        "properties" : {
          "description" : {
            "type" : "string",
            "maxLength" : 4096,
            "minLength" : 0
          },
          "imageUrl" : {
            "type" : "string",
            "format" : "uri"
          },
          "link" : {
            "type" : "string",
            "format" : "uri"
          },
          "name" : {
            "type" : "string",
            "maxLength" : 256,
            "minLength" : 0
          },
          "tags" : {
            "type" : "object",
            "additionalProperties" : {
              "type" : "string"
            }
          }
        },
        "required" : [ "link", "name" ]
      },
      "PublicProfileOwner" : {
        "type" : "object",
        "discriminator" : {
          "propertyName" : "type"
        },
        "properties" : {
          "type" : {
            "type" : "string"
          }
        },
        "required" : [ "type" ]
      },
      "PublicProfileOwnerOrg" : {
        "allOf" : [ {
          "$ref" : "#/components/schemas/PublicProfileOwner"
        }, {
          "type" : "object",
          "properties" : {
            "id" : {
              "type" : "string",
              "format" : "uuid"
            }
          }
        } ],
        "required" : [ "id" ]
      },
      "PublicProfileOwnerUser" : {
        "allOf" : [ {
          "$ref" : "#/components/schemas/PublicProfileOwner"
        }, {
          "type" : "object",
          "properties" : {
            "id" : {
              "type" : "string",
              "format" : "uuid"
            }
          }
        } ],
        "required" : [ "id" ]
      },
      "PublicProfileWriteModel" : {
        "type" : "object",
        "properties" : {
          "description" : {
            "type" : "string",
            "maxLength" : 4096,
            "minLength" : 0
          },
          "imageUrl" : {
            "type" : "string",
            "format" : "uri"
          },
          "links" : {
            "type" : "array",
            "items" : {
              "$ref" : "#/components/schemas/PublicProfileLink"
            },
            "maxItems" : 256,
            "minItems" : 0
          },
          "name" : {
            "type" : "string",
            "maxLength" : 256,
            "minLength" : 1
          },
          "owner" : {
            "oneOf" : [ {
              "$ref" : "#/components/schemas/PublicProfileOwnerOrg"
            }, {
              "$ref" : "#/components/schemas/PublicProfileOwnerUser"
            } ]
          },
          "slug" : {
            "type" : "string",
            "maxLength" : 64,
            "minLength" : 1,
            "pattern" : "^[a-zà-ú0-9\\uD83C-\\uDBFF\\uDC00-\\uDFFF]+(?:-[a-zà-ú0-9\\uD83C-\\uDBFF\\uDC00-\\uDFFF]+)*$"
          },
          "tags" : {
            "type" : "object",
            "additionalProperties" : {
              "type" : "string"
            }
          }
        },
        "required" : [ "name", "slug" ]
      },
      "PublicProfilesList" : {
        "type" : "object",
        "properties" : {
          "publicProfiles" : {
            "type" : "array",
            "items" : {
              "$ref" : "#/components/schemas/PublicProfile"
            }
          }
        },
        "required" : [ "publicProfiles" ]
      },
      "PublicTenant" : {
        "type" : "object",
        "description" : "Represents a tenant entity with publicly accessible information. This model is used when returning tenant data to clients and contains only the non-sensitive information about a tenant.",
        "properties" : {
          "domain" : {
            "type" : "string",
            "description" : "Custom domain name associated with this tenant, if configured",
            "example" : "bookings.acme-corp.com"
          },
          "id" : {
            "type" : "string",
            "description" : "Unique identifier of the tenant, used in API paths and references",
            "example" : "acme-corp"
          },
          "name" : {
            "type" : "string",
            "description" : "Display name of the tenant, suitable for UI presentation",
            "example" : "Acme Corporation"
          },
          "webAppConfig" : {
            "type" : "object",
            "additionalProperties" : {
              "type" : "object"
            },
            "description" : "Tenant-specific configuration for the web application. This may include UI customizations, feature flags, and other tenant-specific settings.",
            "example" : {
              "theme" : "dark",
              "logo" : "https://example.com/logo.png",
              "features" : {
                "advanced_booking" : true
              }
            }
          }
        },
        "required" : [ "id", "name", "webAppConfig" ]
      },
      "PutAfterConfirmingBookingWorkflowRequest" : {
        "allOf" : [ {
          "$ref" : "#/components/schemas/PutWorkflowRequest"
        }, {
          "type" : "object",
          "properties" : {
            "actions" : {
              "type" : "array",
              "items" : {
                "oneOf" : [ {
                  "$ref" : "#/components/schemas/GoogleCalendarEventBookingNotification"
                }, {
                  "$ref" : "#/components/schemas/GoogleCalendarOutOfOfficeBookingNotification"
                } ]
              }
            },
            "name" : {
              "type" : "string"
            },
            "owner" : {
              "oneOf" : [ {
                "$ref" : "#/components/schemas/WorkflowOwnerOrg"
              }, {
                "$ref" : "#/components/schemas/WorkflowOwnerUser"
              } ]
            },
            "tags" : {
              "type" : "object",
              "additionalProperties" : {
                "type" : "string"
              }
            },
            "trigger" : {
              "$ref" : "#/components/schemas/AfterConfirmingBookingTrigger"
            }
          }
        } ],
        "description" : "Request model for creating or updating a workflow that is triggered after a booking is confirmed. This workflow type allows automating post-booking processes such as creating calendar events, sending notifications, or triggering integrations with external systems. The workflow will execute the specified actions in sequence whenever a booking is confirmed in the system.",
        "required" : [ "name", "owner", "trigger" ]
      },
      "PutCalendar" : {
        "type" : "object",
        "description" : "The calendar configuration details",
        "properties" : {
          "defaultTimeZone" : {
            "type" : "string",
            "description" : "The default timezone used for displaying events in this calendar",
            "example" : "America/New_York"
          },
          "description" : {
            "type" : "string",
            "description" : "Optional description of the calendar's purpose or contents",
            "example" : "Calendar for work-related meetings and events",
            "maxLength" : 1024,
            "minLength" : 0
          },
          "name" : {
            "type" : "string",
            "description" : "The display name of the calendar",
            "example" : "Work Calendar",
            "maxLength" : 256,
            "minLength" : 0
          },
          "owner" : {
            "$ref" : "#/components/schemas/CalendarOwner",
            "description" : "The owner of the calendar. If not provided, the authenticated user will be set as the owner."
          },
          "tags" : {
            "type" : "object",
            "additionalProperties" : {
              "type" : "string"
            },
            "description" : "Arbitrary key/value collection. Useful for API users to store metadata."
          }
        },
        "required" : [ "name" ]
      },
      "PutCalendarEventAttendeeInvitationRequest" : {
        "type" : "object",
        "properties" : {
          "description" : {
            "type" : "string",
            "maxLength" : 65536,
            "minLength" : 0
          },
          "displayTimeMode" : {
            "type" : "string",
            "description" : "Configures how TimeTime will show the invitation event time.\n * `EXACT` - It'll show the exact start/end time of the event.\n * `FUZZY` - It'll show a fuzzy version of the event time, like 'MORNING', 'AFTERNOON'... * `START_DATE` - It'll show the starting date day, without time (hours, minutes...) information.",
            "enum" : [ "EXACT", "FUZZY", "START_DATE" ]
          },
          "id" : {
            "type" : "string",
            "format" : "uuid",
            "description" : "The invitation id."
          },
          "subtitle" : {
            "type" : "string",
            "maxLength" : 4096,
            "minLength" : 0
          },
          "summary" : {
            "type" : "string",
            "maxLength" : 2048,
            "minLength" : 0
          }
        }
      },
      "PutCalendarEventRequest" : {
        "type" : "object",
        "properties" : {
          "attachments" : {
            "type" : "array",
            "description" : "Unique collection of event attachments.",
            "items" : {
              "$ref" : "#/components/schemas/CalendarEventAttachment"
            },
            "maxItems" : 128,
            "minItems" : 0,
            "uniqueItems" : true
          },
          "attendees" : {
            "type" : "array",
            "description" : "Collection of the attendees.",
            "items" : {
              "$ref" : "#/components/schemas/CalendarEventAttendeeRequest"
            },
            "maxItems" : 4096,
            "minItems" : 0,
            "uniqueItems" : true
          },
          "calendarId" : {
            "type" : "string",
            "format" : "uuid",
            "description" : "The calendar id this event belongs to."
          },
          "comments" : {
            "type" : "array",
            "description" : "Collection of event comments.",
            "items" : {
              "type" : "string"
            },
            "maxItems" : 32,
            "minItems" : 0,
            "uniqueItems" : true
          },
          "description" : {
            "type" : "string",
            "description" : "Description of the event.",
            "maxLength" : 4096,
            "minLength" : 0
          },
          "interval" : {
            "$ref" : "#/components/schemas/ZonedDateTimeInterval",
            "description" : "Interval indicating when the event is happening. It's optional, an event without an interval is a valid event in TimeTime. It can be useful to keep track of pending tasks that have not a date in the moment of its creation."
          },
          "locations" : {
            "type" : "array",
            "description" : "Collection of event locations. An event will have typically no more than one location, but it can also have more than one, for example, a physical room and an online conference link.",
            "items" : {
              "$ref" : "#/components/schemas/CalendarEventLocation"
            },
            "maxItems" : 32,
            "minItems" : 0,
            "uniqueItems" : true
          },
          "notifications" : {
            "type" : "array",
            "description" : "Collection of event notifications.",
            "items" : {
              "oneOf" : [ {
                "$ref" : "#/components/schemas/EmailConfirmationCalendarEventNotification"
              }, {
                "$ref" : "#/components/schemas/SmsBeforeCalendarEventNotification"
              }, {
                "$ref" : "#/components/schemas/SmsConfirmationCalendarEventNotification"
              }, {
                "$ref" : "#/components/schemas/WhatsappBeforeCalendarEventNotification"
              }, {
                "$ref" : "#/components/schemas/WhatsappConfirmationCalendarEventNotification"
              } ]
            },
            "maxItems" : 16,
            "minItems" : 0,
            "uniqueItems" : true
          },
          "status" : {
            "type" : "string",
            "default" : "CONFIRMED",
            "description" : "Status of the event.",
            "enum" : [ "CONFIRMED", "CANCELLED", "TENTATIVE" ]
          },
          "summary" : {
            "type" : "string",
            "description" : "Summary (title) of the event.",
            "maxLength" : 256,
            "minLength" : 0
          },
          "tags" : {
            "type" : "object",
            "additionalProperties" : {
              "type" : "string"
            },
            "description" : "Arbitrary key/value collection. Useful for API users to store metadata."
          }
        },
        "required" : [ "calendarId" ]
      },
      "PutEventTypeModel" : {
        "type" : "object",
        "description" : "Model for creating or updating an event type. Event types define bookable meeting or appointment slots with specific durations, availability settings, and configuration options. This comprehensive model controls all aspects of how the event type behaves, appears, and integrates with other systems.",
        "properties" : {
          "afterBuffer" : {
            "type" : "string",
            "format" : "duration",
            "description" : "Buffer time to add after each booking of this event type. This ensures there's wrap-up time between meetings. For example, a 15-minute buffer after a 30-minute meeting means no bookings can start less than 15 minutes after this event ends.",
            "example" : "PT15M"
          },
          "availableUnits" : {
            "type" : "integer",
            "format" : "int32",
            "description" : "For event types accepting multi-bookings, this sets the maximum number of people/resources that can book / be booked at the same time. Examples: \n- Restaurants: This is maximum number of people that can be attended at the same time.\n- Bikes store: This is the amount of bikes available.",
            "example" : 10,
            "minimum" : 1
          },
          "beforeBuffer" : {
            "type" : "string",
            "format" : "duration",
            "description" : "Buffer time to add before each booking of this event type. This ensures there's preparation time between meetings. For example, a 15-minute buffer before a 30-minute meeting means no bookings can end less than 15 minutes before this event starts.",
            "example" : "PT15M"
          },
          "bookingMode" : {
            "default" : "InstantBookingMode",
            "description" : "Defines how bookings are processed when created. The booking mode determines whether bookings are automatically confirmed or require explicit confirmation after creation.",
            "oneOf" : [ {
              "$ref" : "#/components/schemas/HoldBookingMode"
            }, {
              "$ref" : "#/components/schemas/InstantBookingMode"
            } ]
          },
          "busyIntervals" : {
            "type" : "array",
            "description" : "Set of specific time intervals during which this event type should be considered busy, regardless of other availability settings. This can be used to block out time slots for specific dates without changing the recurring availability pattern.",
            "items" : {
              "$ref" : "#/components/schemas/InstantInterval"
            },
            "uniqueItems" : true
          },
          "description" : {
            "type" : "string",
            "description" : "A detailed description of the event type that helps bookers understand what to expect. This may include meeting agenda, preparation instructions, or other relevant details.",
            "example" : "Book a 30-minute session to discuss your project requirements and get expert advice."
          },
          "duration" : {
            "type" : "string",
            "format" : "duration",
            "description" : "It defines the duration of the event type.\nAllowed format is ISO-8601 duration, maximum unit allowed is days.",
            "example" : "PT1H"
          },
          "enabled" : {
            "type" : "boolean",
            "default" : "true",
            "description" : "Controls whether this event type is active and available for booking. When set to false, no new bookings can be made for this event type, though existing bookings remain unchanged.",
            "example" : true
          },
          "hosts" : {
            "type" : "array",
            "description" : "Set of users who should have access to this event type. Each entry defines a user by email address who will be given collaborator access to the event type.",
            "items" : {
              "$ref" : "#/components/schemas/ShareWithRequestModel"
            },
            "uniqueItems" : true
          },
          "i18n" : {
            "$ref" : "#/components/schemas/EventTypeI18nConfig",
            "description" : "Configuration for internationalizing the event type content. This allows defining translations for the name, description, and questions in multiple languages."
          },
          "imageUrl" : {
            "type" : "string",
            "format" : "uri",
            "description" : "URL pointing to an image that represents this event type. This image may be displayed on booking pages and in other UI elements.",
            "example" : "https://example.com/images/consultation.jpg"
          },
          "location" : {
            "description" : "Defines where the event will take place. This could be a physical location, a virtual meeting room, or a phone call depending on the selected location type.",
            "oneOf" : [ {
              "$ref" : "#/components/schemas/BookerPhoneLocation"
            }, {
              "$ref" : "#/components/schemas/BookerSelectionLocation"
            }, {
              "$ref" : "#/components/schemas/FixedLocation"
            }, {
              "$ref" : "#/components/schemas/GoogleMeetLocation"
            }, {
              "$ref" : "#/components/schemas/MicrosoftOutlookLocation"
            } ]
          },
          "maxBookingNotice" : {
            "type" : "string",
            "format" : "duration",
            "description" : "The maximum time in advance that a booking can be made. For example, setting this to 'P30D' means bookings can only be made up to 30 days in advance. This helps manage availability for the near future without committing too far ahead.",
            "example" : "P30D"
          },
          "maxBookingsPerTimeUnit" : {
            "$ref" : "#/components/schemas/MaxBookingsPerTimeUnit",
            "description" : "Limits on the number of bookings that can be made within specific time periods. This helps manage booking density and prevent overbooking within hours, days, weeks, or months."
          },
          "maxConcurrentBookings" : {
            "type" : "integer",
            "format" : "int32",
            "description" : "Limits how many concurrent bookings for this event type can happen at the same time. E.G, If it is set to 1, after one booking, the time slot is not available anymore. If null, then unlimited bookings can be made for the same time slot (unless 'availableUnits' is set).",
            "example" : 1,
            "minimum" : 1
          },
          "maxUnitsPerBooking" : {
            "type" : "integer",
            "format" : "int32",
            "description" : "Whenever the 'availableUnits' is set, this sets the limit of how many 'units' can be booked per booking. Examples: \n- Restaurants: This the maximum party size that can make a reservation, for example, up to groups of 10 people max.\n- City tour: The maximum number of people that each of your tour guides can manage.",
            "example" : 5,
            "minimum" : 1
          },
          "minBookingNotice" : {
            "type" : "string",
            "format" : "duration",
            "description" : "The minimum time required before a booking can be made. For example, setting this to 'PT24H' means bookings must be made at least 24 hours in advance. This helps prevent last-minute bookings that may be difficult to accommodate.",
            "example" : "PT24H"
          },
          "minUnitsPerBooking" : {
            "type" : "integer",
            "format" : "int32",
            "description" : "The minimum number of units that can be booked in a single booking. This is only applicable when availableUnits is set. For example, a restaurant might require a minimum party size of 2 people.",
            "example" : 1,
            "minimum" : 0
          },
          "name" : {
            "type" : "string",
            "description" : "The name of the event type that will be displayed to users. This should be concise but descriptive of the meeting purpose.",
            "example" : "30-Minute Consultation"
          },
          "notifications" : {
            "$ref" : "#/components/schemas/BookingNotifications",
            "description" : "Configuration for notifications related to bookings of this event type. This defines when and how notifications are sent for booking confirmations and reminders."
          },
          "pricingPolicy" : {
            "$ref" : "#/components/schemas/PricingPolicyId",
            "description" : "Reference to the pricing policy to be applied to bookings of this event type. The pricing policy defines costs, currency, and payment requirements."
          },
          "questions" : {
            "type" : "array",
            "description" : "List of questions to be answered by the booker during the booking process. These questions can collect information needed for the meeting, such as topics to discuss, background information, or preferences.",
            "items" : {
              "oneOf" : [ {
                "$ref" : "#/components/schemas/EmailQuestion"
              }, {
                "$ref" : "#/components/schemas/ImageQuestion"
              }, {
                "$ref" : "#/components/schemas/LocationQuestion"
              }, {
                "$ref" : "#/components/schemas/PasswordQuestion"
              }, {
                "$ref" : "#/components/schemas/PhoneQuestion"
              }, {
                "$ref" : "#/components/schemas/TextQuestion"
              } ]
            }
          },
          "redirectAfterBooking" : {
            "$ref" : "#/components/schemas/AfterBookingRedirect",
            "description" : "Configuration for redirecting users to a specific URL after completing a booking. This can be used to direct users to payment pages, thank you pages, or additional instructions after booking."
          },
          "repeatingAvailability" : {
            "$ref" : "#/components/schemas/RepeatingAvailability",
            "description" : "Defines the regular weekly schedule when this event type is available for booking. This forms the base availability pattern that repeats every week, before applying exceptions and other rules."
          },
          "resourceRules" : {
            "$ref" : "#/components/schemas/ResourceRules",
            "description" : "Rules for how resources should be allocated when bookings are made for this event type. This applies when the event type is associated with bookable resources."
          },
          "slug" : {
            "type" : "string",
            "description" : "The URL-friendly identifier for this event type, used in booking page URLs. Must be between 2-36 characters and contain only letters, numbers, and hyphens. If not provided, a slug will be automatically generated from the name.",
            "example" : "consultation",
            "maxLength" : 36,
            "minLength" : 2
          },
          "step" : {
            "type" : "string",
            "format" : "duration",
            "description" : "It defines increments for showing the availability slots, example:\n- An step of 15 minutes (PT15M) of a 1 hour meeting, will show as bookable slots: 10:00, 10:15, 10:30, 10:45... \n- An step of 1 hour (PT1H) of a 1 hour meeting, will show as bookable slots: 10:00, 11:00, 12:00, 13:00... \nAllowed format is ISO-8601 duration, maximum unit allowed is days.",
            "example" : "PT30M"
          },
          "tags" : {
            "type" : "object",
            "additionalProperties" : {
              "type" : "string"
            },
            "description" : "Custom metadata tags associated with this event type. These key-value pairs can be used for filtering, categorization, or storing additional information about the event type.",
            "example" : {
              "category" : "consultation",
              "department" : "sales"
            }
          },
          "thirdPartyCalendars" : {
            "$ref" : "#/components/schemas/ThirdPartyCalendars",
            "description" : "Configuration for integration with third-party calendar systems like Google Calendar or Microsoft Outlook. This defines which external calendars should be used for checking availability conflicts and where new bookings should be synchronized."
          },
          "unitsLabel" : {
            "type" : "string",
            "description" : "Units is a very generic concept, depending on the use case units could be referring to 'people', to 'bikes'... etc. The units label is to be able to set a custom label for the units field, that will appear in the booking page next to the 'units' selector.",
            "example" : "People",
            "maxLength" : 32,
            "minLength" : 0
          },
          "userId" : {
            "type" : "string",
            "format" : "uuid",
            "description" : "The user ID of the event type owner. If not provided, the ID of the currently authenticated user will be used. The owner has full control over the event type.",
            "example" : "123e4567-e89b-12d3-a456-426614174000"
          },
          "workflows" : {
            "type" : "array",
            "description" : "List of workflows that should be triggered for bookings of this event type. Workflows define automated actions that execute when certain booking events occur.",
            "items" : {
              "$ref" : "#/components/schemas/AssociatedWorkflow"
            }
          }
        },
        "required" : [ "busyIntervals", "duration", "hosts", "name", "questions", "step", "thirdPartyCalendars" ]
      },
      "PutOrganization" : {
        "type" : "object",
        "description" : "Request model for creating or updating an organization",
        "properties" : {
          "domain" : {
            "type" : "string",
            "description" : "The domain associated with the organization, often used for email validation or SSO",
            "example" : "acme.com",
            "maxLength" : 128,
            "minLength" : 0
          },
          "image" : {
            "type" : "string",
            "format" : "uri",
            "description" : "URL to the organization's logo or image",
            "example" : "https://example.com/logo.png"
          },
          "name" : {
            "type" : "string",
            "description" : "The name of the organization",
            "example" : "Acme Corporation",
            "maxLength" : 256,
            "minLength" : 0
          },
          "tags" : {
            "type" : "object",
            "additionalProperties" : {
              "type" : "string"
            },
            "description" : "Custom metadata for the organization as key-value pairs",
            "example" : {
              "industry" : "technology",
              "size" : "enterprise"
            },
            "maxLength" : 256
          },
          "webhooks" : {
            "type" : "array",
            "description" : "Configuration for webhook endpoints that will receive organization-related events",
            "items" : {
              "$ref" : "#/components/schemas/WebhookDeliveryConfig"
            },
            "maxItems" : 16,
            "minItems" : 0,
            "uniqueItems" : true
          }
        },
        "required" : [ "name" ]
      },
      "PutPricingPolicyRequest" : {
        "type" : "object",
        "description" : "The pricing policy data to create or update, including name, currency, price specification, and optional overrides",
        "properties" : {
          "currency" : {
            "type" : "string",
            "description" : "ISO 4217 Currency code",
            "example" : "EUR",
            "examples" : [ "EUR", "USD" ]
          },
          "name" : {
            "type" : "string",
            "description" : "Name of the pricing policy",
            "example" : "Standard Rate Plan",
            "maxLength" : 256,
            "minLength" : 0
          },
          "overrides" : {
            "type" : "array",
            "description" : "List of conditional pricing overrides that modify the base price under specific conditions or rules.",
            "items" : {
              "$ref" : "#/components/schemas/PricingPolicyOverride"
            },
            "maxLength" : 50
          },
          "owner" : {
            "description" : "Owner of the pricing policy. If not specified, the user's id will be used.",
            "oneOf" : [ {
              "$ref" : "#/components/schemas/PricingPolicyOwnerOrg"
            }, {
              "$ref" : "#/components/schemas/PricingPolicyOwnerUser"
            } ]
          },
          "priceSpecification" : {
            "description" : "Defines the base pricing structure for this policy, including price amount and calculation method.",
            "oneOf" : [ {
              "$ref" : "#/components/schemas/FixedPriceSpecification"
            }, {
              "$ref" : "#/components/schemas/TieredPriceSpecification"
            } ]
          },
          "tags" : {
            "type" : "object",
            "additionalProperties" : {
              "type" : "string"
            },
            "description" : "Arbitrary key/value collection. Useful for API users to store metadata."
          }
        },
        "required" : [ "currency", "name", "priceSpecification" ]
      },
      "PutProfileBody" : {
        "type" : "object",
        "description" : "The updated profile information",
        "properties" : {
          "clientState" : {
            "type" : "string",
            "description" : "Optional custom data that can be stored by client applications. Limited to 65535 characters.",
            "example" : {
              "theme" : "dark",
              "dashboardLayout" : "compact"
            },
            "maxLength" : 65535,
            "minLength" : 0
          },
          "locale" : {
            "type" : "string",
            "format" : "locale",
            "description" : "The user's language and regional formatting preferences",
            "example" : "en_US"
          },
          "slug" : {
            "type" : "string",
            "description" : "A unique, URL-friendly identifier for the user. Must be lowercase letters, numbers, and hyphens only.",
            "example" : "john-doe",
            "maxLength" : 36,
            "minLength" : 2,
            "pattern" : "^[a-zà-ú0-9\\uD83C-\\uDBFF\\uDC00-\\uDFFF]+(?:-[a-zà-ú0-9\\uD83C-\\uDBFF\\uDC00-\\uDFFF]+)*$"
          },
          "tags" : {
            "type" : "object",
            "additionalProperties" : {
              "type" : "string"
            },
            "description" : "Optional key-value pairs for additional metadata about the user",
            "example" : {
              "department" : "Engineering",
              "role" : "Developer"
            }
          },
          "timeZone" : {
            "type" : "string",
            "description" : "The user's preferred time zone for displaying dates and times",
            "example" : "America/New_York"
          }
        },
        "required" : [ "locale", "slug", "timeZone" ]
      },
      "PutResource" : {
        "type" : "object",
        "description" : "The resource configuration containing all the properties to set on the resource, such as name, booking rules, tags, and collaborators.",
        "properties" : {
          "bookingRules" : {
            "$ref" : "#/components/schemas/BookingRules",
            "description" : "Booking rules that define how this resource can be booked, including constraints on duration, notice periods, and capacity"
          },
          "collaborators" : {
            "type" : "array",
            "description" : "Set of collaborators who can access and use this resource. Collaborators can use the resource in their services but cannot modify or delete it.",
            "items" : {
              "oneOf" : [ {
                "$ref" : "#/components/schemas/OrganizationResourceCollaborator"
              } ]
            },
            "maxItems" : 32,
            "maxLength" : 32,
            "minItems" : 0,
            "uniqueItems" : true
          },
          "name" : {
            "type" : "string",
            "description" : "Name of the resource",
            "example" : "Conference Room A",
            "maxLength" : 256,
            "minLength" : 0
          },
          "tags" : {
            "type" : "object",
            "additionalProperties" : {
              "type" : "string"
            },
            "description" : "Custom key-value pairs that can be used to categorize or provide additional metadata for the resource",
            "example" : {
              "location" : "Building 1",
              "capacity" : "10",
              "equipment" : "Projector, Whiteboard"
            },
            "maxLength" : 256
          }
        },
        "required" : [ "collaborators", "name" ]
      },
      "PutResourceGroup" : {
        "type" : "object",
        "description" : "The resource group configuration containing all the properties to set on the resource group, such as name, resources, and tags.",
        "properties" : {
          "name" : {
            "type" : "string",
            "description" : "Name of the resource group",
            "example" : "Conference Rooms",
            "maxLength" : 256,
            "minLength" : 0
          },
          "resources" : {
            "type" : "array",
            "description" : "Set of resources to include in this group. All resources must be accessible to the authenticated user.",
            "items" : {
              "$ref" : "#/components/schemas/PutResourceInGroup"
            },
            "maxItems" : 4096,
            "maxLength" : 4096,
            "minItems" : 0,
            "uniqueItems" : true
          },
          "tags" : {
            "type" : "object",
            "additionalProperties" : {
              "type" : "string"
            },
            "description" : "Custom key-value pairs that can be used to categorize or provide additional metadata for the resource group",
            "example" : {
              "department" : "Sales",
              "priority" : "High"
            },
            "maxLength" : 256
          }
        },
        "required" : [ "name", "resources" ]
      },
      "PutResourceInGroup" : {
        "type" : "object",
        "description" : "Reference to a resource that should be included in the resource group",
        "properties" : {
          "id" : {
            "type" : "string",
            "format" : "uuid",
            "description" : "Unique identifier of the resource to include in the group",
            "example" : "123e4567-e89b-12d3-a456-426614174000"
          }
        },
        "required" : [ "id" ]
      },
      "PutWorkflowRequest" : {
        "type" : "object",
        "description" : "Base model for creating or updating a workflow. Workflows are automated processes that can be triggered by specific events in the system, such as after a booking confirmation. Each workflow type extends this base class with specific trigger and action definitions.",
        "discriminator" : {
          "propertyName" : "type"
        },
        "properties" : {
          "actions" : {
            "type" : "array",
            "description" : "List of actions to execute when the workflow is triggered. Actions are executed in the order they appear in this list.",
            "items" : {
              "type" : "object"
            },
            "maxItems" : 32,
            "maxLength" : 32,
            "minItems" : 0
          },
          "name" : {
            "type" : "string",
            "description" : "A descriptive name for the workflow to identify its purpose.",
            "example" : "Send confirmation email after booking",
            "maxLength" : 256,
            "minLength" : 0
          },
          "owner" : {
            "description" : "The entity that owns this workflow, typically a user.",
            "oneOf" : [ {
              "$ref" : "#/components/schemas/WorkflowOwnerOrg"
            }, {
              "$ref" : "#/components/schemas/WorkflowOwnerUser"
            } ]
          },
          "tags" : {
            "type" : "object",
            "additionalProperties" : {
              "type" : "string"
            },
            "description" : "Arbitrary key/value collection. Useful for API users to store metadata."
          },
          "trigger" : {
            "type" : "object",
            "description" : "Defines when this workflow should be triggered. The specific type depends on the workflow type."
          },
          "type" : {
            "type" : "string"
          }
        },
        "required" : [ "name", "owner", "trigger", "type" ]
      },
      "QuestionI18nConfig" : {
        "type" : "object",
        "description" : "Configuration for internationalization of questions associated with an event type. This allows questions to be displayed in the user's preferred language.",
        "properties" : {
          "label" : {
            "type" : "object",
            "additionalProperties" : {
              "type" : "string"
            },
            "description" : "Translations of the question label in different languages. Keys are locale codes (e.g., 'en', 'es', 'fr') and values are the translated question labels.",
            "example" : {
              "en" : "What is your name?",
              "es" : "¿Cómo te llamas?",
              "fr" : "Comment vous appelez-vous?"
            }
          }
        }
      },
      "RepeatingAvailability" : {
        "type" : "object",
        "description" : "Defines recurring availability patterns on a weekly schedule. This model allows specifying regular time slots when bookings can be made, organized by day of the week. These patterns repeat indefinitely and form the base availability for event types before considering exceptions, conflicts, and other booking rules.",
        "properties" : {
          "timeZone" : {
            "type" : "string",
            "description" : "The timezone in which the availability time slots are defined. All time ranges are interpreted according to this timezone, allowing for proper handling of daylight saving time transitions and international scheduling.",
            "example" : "America/New_York"
          },
          "weekly" : {
            "type" : "object",
            "additionalProperties" : {
              "type" : "array",
              "items" : {
                "$ref" : "#/components/schemas/TimeRange"
              },
              "uniqueItems" : true
            },
            "description" : "A map defining available time slots for each day of the week. The keys are standard Java DayOfWeek enum values (MONDAY, TUESDAY, etc.), and the values are sets of time ranges representing available slots on that day. Empty sets indicate no availability for that day.",
            "example" : {
              "MONDAY" : [ {
                "start" : "09:00",
                "end" : "12:00"
              }, {
                "start" : "13:00",
                "end" : "17:00"
              } ],
              "WEDNESDAY" : [ {
                "start" : "10:00",
                "end" : "15:00"
              } ]
            }
          }
        },
        "required" : [ "timeZone", "weekly" ]
      },
      "Resource" : {
        "type" : "object",
        "description" : "Represents any bookable entity in the TimeTime system. Resources are extremely versatile and can represent\nvirtually anything that needs to be scheduled or booked, including:\n- People (staff members, professionals, service providers, teachers, doctors, etc.)\n- Physical spaces (meeting rooms, conference halls, event venues, restaurant tables)\n- Equipment (vehicles, tools, AV equipment, medical devices)\n- Digital assets (licenses, virtual meeting rooms)\n- Services (consultation slots, training sessions)\n\nTimeTime is designed to be multipurpose, allowing you to model any scheduling scenario by configuring resources\nwith appropriate booking rules, tags, and collaborators. The flexible tagging system allows you to categorize and organize\nresources according to your specific business needs.",
        "properties" : {
          "bookingRules" : {
            "$ref" : "#/components/schemas/BookingRules",
            "description" : "Rules that govern how this resource can be booked, including constraints on duration, notice periods, and capacity. These rules define when and how the resource is available for booking, minimum and maximum booking durations, buffer times between bookings, and any other constraints that apply to scheduling this resource.",
            "example" : {
              "minDuration" : 30,
              "maxDuration" : 120,
              "bufferBefore" : 15,
              "bufferAfter" : 15,
              "availableInGroups" : [ {
                "groupId" : "group-123"
              } ]
            }
          },
          "collaborators" : {
            "type" : "array",
            "description" : "Entities that have been granted access to use this resource. Collaborators can include organizations whose members can see and use the resource for their services. Collaborators have limited permissions compared to the resource owner and typically can only use the resource in their event types but cannot modify or delete it.",
            "items" : {
              "oneOf" : [ {
                "$ref" : "#/components/schemas/OrganizationResourceCollaborator"
              } ]
            },
            "uniqueItems" : true
          },
          "id" : {
            "type" : "string",
            "format" : "uuid",
            "description" : "Unique identifier of the resource",
            "example" : "123e4567-e89b-12d3-a456-426614174000"
          },
          "name" : {
            "type" : "string",
            "description" : "Name of the resource. Can describe what the resource is, such as 'Dr. Jane Smith', 'Conference Room A', 'Company Van #3', etc.",
            "example" : "Conference Room A"
          },
          "owner" : {
            "$ref" : "#/components/schemas/ResourceOwner",
            "description" : "Information about the owner of this resource. The owner has full control over the resource, including the ability to modify its properties, delete it, and manage its collaborators. The owner is typically the user who created the resource or an administrator of the tenant.",
            "example" : {
              "id" : "123e4567-e89b-12d3-a456-426614174000",
              "email" : "owner@example.com"
            }
          },
          "tags" : {
            "type" : "object",
            "additionalProperties" : {
              "type" : "string"
            },
            "description" : "Custom key-value pairs that provide additional metadata and categorization for the resource.\nExamples include:\n- For staff: {\"specialty\": \"Pediatrics\", \"languages\": \"English, Spanish\"}\n- For rooms: {\"capacity\": \"12\", \"equipment\": \"Projector, Whiteboard\"}\n- For equipment: {\"model\": \"Canon EOS R5\", \"condition\": \"Excellent\"}",
            "example" : {
              "location" : "Building 1",
              "capacity" : "10",
              "equipment" : "Projector, Whiteboard"
            }
          }
        },
        "required" : [ "bookingRules", "collaborators", "id", "name", "owner", "tags" ]
      },
      "ResourceCollaborator" : {
        "type" : "object",
        "description" : "Collaborators for the resource. Once a collaborator is added, that means the they can see and configure this resource as needed for their services.",
        "discriminator" : {
          "propertyName" : "type"
        },
        "properties" : {
          "type" : {
            "type" : "string"
          }
        },
        "required" : [ "type" ]
      },
      "ResourceGroup" : {
        "type" : "object",
        "description" : "A group of resources that can be managed together. Resource groups allow for organizing related resources for\neasier management and access control.\n\nIn TimeTime's multipurpose scheduling framework, resource groups can represent various logical collections depending on your use case:\n- Teams of people (doctors in a department, service providers with similar skills)\n- Locations (rooms on the same floor, tables in a restaurant section)\n- Equipment categories (camera gear, medical devices, vehicles)\n- Service packages (related consultation types)\n\nExamples of resource groups include:\n- \"Cardiology Department\" (containing doctor resources)\n- \"Conference Rooms - 3rd Floor\" (containing meeting room resources)\n- \"Photography Equipment\" (containing camera and lighting equipment resources)\n- \"Premium Consultation Services\" (containing various high-tier service resources)\n\nResource groups provide a flexible way to organize your scheduling resources according to your specific business needs and workflows.",
        "properties" : {
          "id" : {
            "type" : "string",
            "format" : "uuid",
            "description" : "Unique identifier of the resource group",
            "example" : "123e4567-e89b-12d3-a456-426614174000"
          },
          "name" : {
            "type" : "string",
            "description" : "Name of the resource group",
            "example" : "Conference Rooms"
          },
          "resources" : {
            "type" : "array",
            "description" : "Set of resources included in this resource group",
            "items" : {
              "$ref" : "#/components/schemas/Resource"
            },
            "uniqueItems" : true
          },
          "tags" : {
            "type" : "object",
            "additionalProperties" : {
              "type" : "string"
            },
            "description" : "Custom tags associated with this resource group, as key-value pairs.\nTags can provide additional categorization and metadata for the group, such as:\n- {\"department\": \"Radiology\", \"priority\": \"High\"}\n- {\"location\": \"Main Building\", \"floor\": \"3\"}\n- {\"category\": \"Premium\", \"availability\": \"Limited\"}",
            "example" : {
              "department" : "Sales",
              "priority" : "High"
            }
          }
        },
        "required" : [ "id", "name", "resources", "tags" ]
      },
      "ResourceGroupId" : {
        "type" : "object",
        "description" : "Represents the identifier of a resource group, which is a collection of related resources that can be managed together for booking purposes",
        "properties" : {
          "id" : {
            "type" : "string",
            "format" : "uuid",
            "description" : "The unique identifier of the resource group",
            "example" : "123e4567-e89b-12d3-a456-426614174000"
          }
        },
        "required" : [ "id" ]
      },
      "ResourceGroupsList" : {
        "type" : "object",
        "description" : "A collection of resource groups owned by the authenticated user",
        "properties" : {
          "resourceGroups" : {
            "type" : "array",
            "description" : "The set of resource groups owned by the authenticated user",
            "items" : {
              "$ref" : "#/components/schemas/ResourceGroup"
            },
            "uniqueItems" : true
          }
        },
        "required" : [ "resourceGroups" ]
      },
      "ResourceId" : {
        "type" : "object",
        "description" : "Represents the identifier of a bookable resource, such as a person, space, equipment, or service",
        "properties" : {
          "id" : {
            "type" : "string",
            "format" : "uuid",
            "description" : "The unique identifier of the resource",
            "example" : "123e4567-e89b-12d3-a456-426614174000"
          }
        },
        "required" : [ "id" ]
      },
      "ResourceOwner" : {
        "type" : "object",
        "description" : "Represents the owner of a resource. The owner has full control over the resource, including the ability to modify its properties, delete it, and manage its collaborators. Resource ownership is typically assigned to the user who created the resource or to an administrator of the tenant.",
        "properties" : {
          "email" : {
            "type" : "string",
            "description" : "Email address of the resource owner, used for notifications and identification",
            "example" : "owner@example.com"
          },
          "id" : {
            "type" : "string",
            "format" : "uuid",
            "description" : "Unique identifier of the resource owner",
            "example" : "123e4567-e89b-12d3-a456-426614174000"
          }
        },
        "required" : [ "email", "id" ]
      },
      "ResourceRules" : {
        "type" : "object",
        "description" : "Defines rules for resource availability and dependencies in the context of bookings. These rules determine how resources are allocated and which resources must be available together for a booking to be possible.",
        "properties" : {
          "availableInGroups" : {
            "type" : "array",
            "description" : "Rules that define which resource groups must have a minimum number of available resources for a booking to be possible",
            "items" : {
              "$ref" : "#/components/schemas/AvailableInGroupRule"
            },
            "uniqueItems" : true
          },
          "linkedResources" : {
            "type" : "array",
            "description" : "Linked resources are useful to specify dependencies among different resources/event types. When linked resources are configured, the availability of those will be taken into account for the event type availability check. Also, when a booking is performed, these linked resources will be booked as well",
            "items" : {
              "$ref" : "#/components/schemas/ResourceId"
            },
            "uniqueItems" : true
          }
        }
      },
      "ResourcesList" : {
        "type" : "object",
        "description" : "A collection of resources that are accessible to the authenticated user, either as an owner or as a collaborator.\nResources in TimeTime can represent various types of bookable entities depending on your specific use case.",
        "properties" : {
          "resources" : {
            "type" : "array",
            "description" : "The set of resources accessible to the authenticated user",
            "items" : {
              "$ref" : "#/components/schemas/Resource"
            },
            "uniqueItems" : true
          }
        },
        "required" : [ "resources" ]
      },
      "SendUpcomingBookingsEmailRequest" : {
        "type" : "object",
        "properties" : {
          "email" : {
            "type" : "string"
          },
          "locale" : {
            "type" : "string",
            "format" : "locale"
          }
        },
        "required" : [ "email" ]
      },
      "ShareWithRequestModel" : {
        "type" : "object",
        "properties" : {
          "email" : {
            "type" : "string",
            "description" : "Email address of the user to share the event type with. This user will be given collaborator access to the event type.",
            "example" : "collaborator@example.com"
          }
        },
        "required" : [ "email" ]
      },
      "SmsBeforeCalendarEventNotification" : {
        "allOf" : [ {
          "$ref" : "#/components/schemas/CalendarEventNotification"
        }, {
          "type" : "object",
          "properties" : {
            "before" : {
              "type" : "string",
              "format" : "duration",
              "description" : "How much before the start of the event the notification needs to be triggered, in ISO8601 duration format.For sending the notification 15 minutes before the event, PT15M is a valid value.",
              "examples" : [ "PT1H", "PT30M" ]
            },
            "id" : {
              "type" : "string",
              "format" : "uuid",
              "description" : "The notification id."
            },
            "locale" : {
              "type" : "string",
              "format" : "locale",
              "description" : "Locale to be used to send the notification."
            },
            "phone" : {
              "type" : "string",
              "description" : "The phone number of the receiver, in e164 format."
            }
          }
        } ],
        "required" : [ "before", "id", "locale", "phone" ]
      },
      "SmsConfirmationCalendarEventNotification" : {
        "allOf" : [ {
          "$ref" : "#/components/schemas/CalendarEventNotification"
        }, {
          "type" : "object",
          "properties" : {
            "id" : {
              "type" : "string",
              "format" : "uuid",
              "description" : "The notification id."
            },
            "locale" : {
              "type" : "string",
              "format" : "locale",
              "description" : "Locale to be used to send the notification."
            },
            "phone" : {
              "type" : "string",
              "description" : "The phone number of the receiver, in e164 format."
            }
          }
        } ],
        "required" : [ "id", "locale", "phone" ]
      },
      "StartDateCalendarEventInvitationInterval" : {
        "allOf" : [ {
          "$ref" : "#/components/schemas/CalendarEventInvitationEvent"
        }, {
          "type" : "object",
          "properties" : {
            "date" : {
              "type" : "string",
              "format" : "date",
              "description" : "The start date of the invitation, ISO 8601 format, YYYY-MM-DD"
            },
            "timeZone" : {
              "type" : "string",
              "description" : "The time zone in which the time is specified. (Formatted as an IANA Time Zone Database name, e.g. \"Europe/Zurich\".)",
              "example" : "Europe/Madrid"
            }
          }
        } ],
        "required" : [ "date", "timeZone" ]
      },
      "Tenant" : {
        "type" : "object",
        "description" : "Represents a tenant entity in the TimeTime platform. A tenant is the top-level organizational unit that represents an isolated customer environment with its own users, resources, and settings. Tenants have distinct configurations, branding, and subscription levels that determine feature access.",
        "properties" : {
          "domain" : {
            "type" : "string",
            "description" : "Custom domain name associated with this tenant, if configured. Used for white-labeled booking pages and applications.",
            "example" : "bookings.acme-corp.com"
          },
          "id" : {
            "type" : "string",
            "description" : "Unique identifier of the tenant, used in API paths and references",
            "example" : "acme-corp"
          },
          "name" : {
            "type" : "string",
            "description" : "Display name of the tenant, suitable for UI presentation and branding",
            "example" : "Acme Corporation"
          },
          "webAppConfig" : {
            "type" : "object",
            "additionalProperties" : {
              "type" : "object"
            },
            "description" : "Tenant-specific configuration for the web application. This may include UI customizations, feature flags, branding settings, and other tenant-specific configurations that affect the behavior and appearance of the application.",
            "example" : {
              "theme" : "dark",
              "logo" : "https://example.com/logo.png",
              "features" : {
                "advanced_booking" : true
              }
            }
          },
          "webhooks" : {
            "type" : "array",
            "description" : "Global webhook configurations for the tenant. These webhooks are triggered for events across the entire tenant, such as bookings, calendar changes, and user updates. Each webhook has a delivery URL, secret, and event filters.",
            "example" : [ {
              "url" : "https://example.com/webhooks",
              "secret" : "whsec_abc123",
              "events" : [ "booking.created", "booking.cancelled" ]
            } ],
            "items" : {
              "$ref" : "#/components/schemas/WebhookDeliveryConfig"
            },
            "uniqueItems" : true
          }
        },
        "required" : [ "id", "name", "webAppConfig", "webhooks" ]
      },
      "TenantMembershipModel" : {
        "type" : "object",
        "description" : "Represents a user's membership in a tenant, including their role and permissions",
        "properties" : {
          "id" : {
            "type" : "string",
            "description" : "The unique identifier of the tenant",
            "example" : "tenant_12345"
          },
          "role" : {
            "type" : "string",
            "description" : "The user's role within the tenant",
            "enum" : [ "ADMIN", "USER" ],
            "example" : "ADMIN"
          }
        },
        "required" : [ "id", "role" ]
      },
      "TextQuestion" : {
        "allOf" : [ {
          "$ref" : "#/components/schemas/EventTypeQuestion"
        }, {
          "type" : "object",
          "properties" : {
            "canBeDeleted" : {
              "type" : "boolean",
              "readOnly" : true
            }
          }
        } ],
        "required" : [ "id", "label" ]
      },
      "ThirdPartyCalendarEvent" : {
        "type" : "object",
        "properties" : {
          "calendar" : {
            "$ref" : "#/components/schemas/ThirdPartyCalendarModel"
          },
          "interval" : {
            "$ref" : "#/components/schemas/InstantInterval"
          }
        },
        "required" : [ "calendar", "interval" ]
      },
      "ThirdPartyCalendarEventsList" : {
        "type" : "object",
        "properties" : {
          "events" : {
            "type" : "array",
            "items" : {
              "$ref" : "#/components/schemas/ThirdPartyCalendarEvent"
            }
          }
        },
        "required" : [ "events" ]
      },
      "ThirdPartyCalendarId" : {
        "type" : "object",
        "description" : "Represents a reference to an external calendar in a third-party calendar system like Google Calendar or Office 365. This model is used when integrating with external calendar services for checking availability or synchronizing events.",
        "properties" : {
          "id" : {
            "type" : "string",
            "description" : "The unique identifier of the external calendar. This is not the raw calendar ID from the third-party system, but rather TimeTime's internal reference to that calendar. The format typically includes a prefix indicating the calendar provider followed by an identifier, and can be obtained through the user profile or calendar integration endpoints.",
            "example" : "google-calendar-primary-123456",
            "examples" : [ "google-calendar-work-789012", "office365-calendar-meetings-345678" ]
          }
        },
        "required" : [ "id" ]
      },
      "ThirdPartyCalendarModel" : {
        "type" : "object",
        "description" : "Represents a calendar from an external calendar system (like Google Calendar or Microsoft Outlook) connected to a user's account",
        "properties" : {
          "account" : {
            "type" : "string",
            "description" : "The account identifier (typically email) associated with this calendar",
            "example" : "user@example.com"
          },
          "description" : {
            "type" : "string",
            "description" : "Optional description of the calendar's purpose or contents",
            "example" : "Calendar for work-related meetings and events"
          },
          "id" : {
            "type" : "string",
            "description" : "The unique identifier of the third-party calendar",
            "example" : "google:user@example.com:calendar_id"
          },
          "name" : {
            "type" : "string",
            "description" : "The display name of the calendar",
            "example" : "Work Calendar"
          },
          "primary" : {
            "type" : "boolean",
            "description" : "Whether this is the primary calendar for the account",
            "example" : true
          },
          "provider" : {
            "type" : "string",
            "description" : "The calendar service provider",
            "enum" : [ "GOOGLE", "MICROSOFT", "APPLE" ],
            "example" : "GOOGLE"
          },
          "readOnly" : {
            "type" : "boolean",
            "description" : "Whether this calendar is read-only or can be modified",
            "example" : false
          }
        },
        "required" : [ "account", "id", "name", "primary", "provider", "readOnly" ]
      },
      "ThirdPartyCalendars" : {
        "type" : "object",
        "description" : "Configuration for integration with third-party calendar systems like Google Calendar. This model defines which external calendars should be used for availability checking and booking synchronization.",
        "properties" : {
          "toSyncBookings" : {
            "type" : "array",
            "description" : "Set of external calendars where new bookings should be synchronized. When a booking is created in TimeTime, corresponding events will be automatically created in these calendars.",
            "example" : [ "google-calendar-id-123", "google-calendar-id-456" ],
            "items" : {
              "$ref" : "#/components/schemas/ThirdPartyCalendarId"
            },
            "uniqueItems" : true
          },
          "toVerifyAvailability" : {
            "type" : "array",
            "description" : "Set of external calendars that should be checked for conflicts when determining availability. The system will verify that there are no overlapping events in these calendars before allowing a booking to be made.",
            "example" : [ "google-calendar-id-123", "office365-calendar-id-789" ],
            "items" : {
              "$ref" : "#/components/schemas/ThirdPartyCalendarId"
            },
            "uniqueItems" : true
          }
        },
        "required" : [ "toSyncBookings", "toVerifyAvailability" ]
      },
      "ThirdPartyConsentBody" : {
        "type" : "object",
        "properties" : {
          "authCode" : {
            "type" : "string"
          },
          "provider" : {
            "type" : "string",
            "enum" : [ "MICROSOFT" ]
          }
        },
        "required" : [ "authCode", "provider" ]
      },
      "TieredPriceItem" : {
        "type" : "object",
        "description" : "Represents a single tier in a tiered pricing structure, defining a specific duration and its corresponding price.",
        "properties" : {
          "amount" : {
            "type" : "string",
            "description" : "Amount expressed in an string to avoid precisions loses.",
            "examples" : [ "12.45", "20" ]
          },
          "duration" : {
            "type" : "string",
            "format" : "duration",
            "description" : "Allowed format is ISO-8601 duration, maximum unit allowed is days",
            "examples" : [ "PT1H", "PT30M" ]
          }
        },
        "required" : [ "amount", "duration" ]
      },
      "TieredPriceSpecification" : {
        "allOf" : [ {
          "$ref" : "#/components/schemas/PriceSpecification"
        }, {
          "type" : "object",
          "properties" : {
            "items" : {
              "type" : "array",
              "description" : "List of price tiers, each specifying a duration and corresponding price amount",
              "items" : {
                "$ref" : "#/components/schemas/TieredPriceItem"
              },
              "maxItems" : 64,
              "minItems" : 1
            }
          }
        } ],
        "description" : "A pricing model where the price varies based on duration tiers. This allows for more complex pricing structures such as charging different rates for different durations of service.",
        "required" : [ "items" ]
      },
      "TimeRange" : {
        "type" : "object",
        "description" : "Represents a time range within a single day, defined by start and end times without date or timezone information. This model is used for defining recurring availability patterns, operating hours, and other time-based configurations that repeat on different days.",
        "properties" : {
          "end" : {
            "type" : "string",
            "format" : "time",
            "description" : "The ending time of the range in 24-hour format (HH:MM). The system accepts values with or without leading zeros (17:00 or 5:00 PM), but always returns standardized time with leading zeros. The end time must be later than the start time within the same day.",
            "example" : "17:30"
          },
          "start" : {
            "type" : "string",
            "format" : "time",
            "description" : "The starting time of the range in 24-hour format (HH:MM). The system accepts values with or without leading zeros (9:00 or 09:00), but always returns standardized time with leading zeros.",
            "example" : "09:00"
          }
        },
        "required" : [ "end", "start" ]
      },
      "Units" : {
        "type" : "object",
        "description" : "Defines unit-based booking configurations, allowing the representation of limited resources that can be allocated per booking. Units can represent many concepts depending on the use case, such as people in a group booking, tables at a restaurant, vehicles in a rental service, or any other quantifiable resource.",
        "properties" : {
          "availableUnits" : {
            "type" : "integer",
            "format" : "int32",
            "description" : "The number of units available for a given time slot. In the restaurant use case, this could represent the number of tables that are available in the restaurant. Different bookings can consume different number of units, using the 'units' field in the booking.",
            "minimum" : 1
          },
          "maxUnitsPerBooking" : {
            "type" : "integer",
            "format" : "int32",
            "description" : "Whenever the 'availableUnits' is set, this sets the limit of how many 'units' can be booked per booking. Examples: \n- Restaurants: This the maximum party size that can make a reservation, for example, up to groups of 10 people max.\n- City tour: The maximum number of people that each of your tour guides can manage.",
            "minimum" : 1
          },
          "minUnitsPerBooking" : {
            "type" : "integer",
            "format" : "int32",
            "description" : "Minimum number of units that can be reserved in a single booking. For example, a restaurant might require a minimum party size of 2 people.",
            "example" : 2,
            "minimum" : 1
          },
          "unitsLabel" : {
            "type" : "string",
            "description" : "Units is a very generic concept, depending on the use case units could be referring to 'people', to 'bikes'... etc. The units label is to be able to set a custom label for the units field, that will appear in the booking page next to the 'units' selector.",
            "example" : "People",
            "maxLength" : 32,
            "minLength" : 0
          }
        }
      },
      "UpcomingBooking" : {
        "allOf" : [ {
          "$ref" : "#/components/schemas/Webhook"
        }, {
          "type" : "object",
          "properties" : {
            "booking" : {
              "$ref" : "#/components/schemas/Booking",
              "description" : "The booking details for the upcoming appointment"
            }
          }
        } ],
        "description" : "Represents a webhook event payload that is sent as a reminder for an upcoming booking. This notification is typically sent at a configured time before the scheduled booking to help participants prepare.",
        "required" : [ "booking" ]
      },
      "UsedBookingResource" : {
        "type" : "object",
        "description" : "Model representing a resource that is being used or reserved as part of a booking. Resources can be physical spaces, equipment, services, or people that are allocated to a booking.",
        "properties" : {
          "id" : {
            "type" : "string",
            "format" : "uuid",
            "description" : "The unique identifier of the resource being used in the booking. This ID must reference an existing resource in the system.",
            "example" : "550e8400-e29b-41d4-a716-446655440000"
          }
        },
        "required" : [ "id" ]
      },
      "User" : {
        "type" : "object",
        "description" : "Represents a user profile with personal information, preferences, and system settings",
        "properties" : {
          "clientState" : {
            "type" : "string",
            "description" : "Custom data stored by client applications",
            "example" : {
              "theme" : "dark",
              "dashboardLayout" : "compact"
            }
          },
          "email" : {
            "type" : "string",
            "description" : "The user's email address",
            "example" : "user@example.com"
          },
          "externalId" : {
            "type" : "string",
            "description" : "Optional identifier from an external system",
            "example" : "ext_12345"
          },
          "locale" : {
            "type" : "string",
            "format" : "locale",
            "description" : "The user's language and regional formatting preferences",
            "example" : "en_US"
          },
          "organizationMemberships" : {
            "type" : "array",
            "description" : "The organizations this user belongs to and their roles within each organization",
            "items" : {
              "$ref" : "#/components/schemas/OrganizationMembership"
            },
            "uniqueItems" : true
          },
          "slug" : {
            "type" : "string",
            "description" : "A unique, URL-friendly identifier for the user",
            "example" : "john-doe"
          },
          "tags" : {
            "type" : "object",
            "additionalProperties" : {
              "type" : "string"
            },
            "description" : "Key-value pairs for additional metadata about the user",
            "example" : {
              "department" : "Engineering",
              "role" : "Developer"
            }
          },
          "tenant" : {
            "$ref" : "#/components/schemas/TenantMembershipModel",
            "description" : "Information about the user's membership in their tenant"
          },
          "thirdPartyCalendars" : {
            "type" : "array",
            "description" : "List of third-party calendars connected to this user's account",
            "items" : {
              "$ref" : "#/components/schemas/ThirdPartyCalendarModel"
            }
          },
          "timeZone" : {
            "type" : "string",
            "description" : "The user's preferred time zone for displaying dates and times",
            "example" : "America/New_York"
          },
          "userId" : {
            "type" : "string",
            "format" : "uuid",
            "description" : "The unique identifier of the user",
            "example" : "123e4567-e89b-12d3-a456-426614174000"
          }
        },
        "required" : [ "clientState", "email", "locale", "organizationMemberships", "slug", "tags", "tenant", "thirdPartyCalendars", "timeZone", "userId" ]
      },
      "Webhook" : {
        "type" : "object",
        "description" : "Base class for all webhook event payloads in TimeTime.\n\nWebhooks in TimeTime provide a way for external systems to receive real-time notifications about events\noccurring within the platform. They enable integration with other applications by pushing data to a specified\nURL whenever certain events happen, rather than requiring external systems to poll for changes.\n\nAll webhook payloads include a 'type' field indicating which type of event triggered the webhook:\n\n1. **CalendarEventChanged**: Sent when a calendar event is created, updated, or cancelled. Includes both the\n   new state of the event and semantic differences describing what changed.\n\n2. **BookingChanged**: Sent when a booking is created, updated, or cancelled. Includes both the new state\n   of the booking and optionally the previous state.\n\n3. **UpcomingBooking**: Sent as a reminder for an upcoming booking at a configured time before the scheduled\n   appointment to help participants prepare.\n\nWebhooks can be configured at the tenant level (affecting all resources in the tenant) or at the event type\nlevel (for specific event types only). Each webhook configuration specifies which event types to listen for\nand the URL where notifications should be sent.",
        "discriminator" : {
          "propertyName" : "type"
        },
        "properties" : {
          "type" : {
            "type" : "string"
          }
        },
        "required" : [ "type" ]
      },
      "WebhookDeliveryConfig" : {
        "type" : "object",
        "description" : "Configuration for webhook delivery settings. Webhooks allow external systems to receive real-time notifications about events in TimeTime, such as booking confirmations, cancellations, or updates. This configuration specifies the endpoint URL and security settings for webhook delivery.",
        "properties" : {
          "password" : {
            "type" : "string",
            "description" : "A secret password used to authenticate webhook requests. When set, this password will be included in the 'X-TT-Webhook-Password' HTTP header with each webhook request. Recipients should validate this password to ensure the webhook came from TimeTime.",
            "example" : "s3cr3t-p4ssw0rd-f0r-webhooks",
            "maxLength" : 2048,
            "minLength" : 0
          },
          "url" : {
            "type" : "string",
            "format" : "uri",
            "description" : "The URL endpoint that will receive webhook notifications. This must be a valid HTTPS URL that can accept POST requests. The system will send event data in JSON format to this endpoint.",
            "example" : "https://example.com/webhooks/timetime",
            "maxLength" : 2048,
            "minLength" : 0
          }
        },
        "required" : [ "url" ]
      },
      "WhatsappBeforeCalendarEventNotification" : {
        "allOf" : [ {
          "$ref" : "#/components/schemas/CalendarEventNotification"
        }, {
          "type" : "object",
          "properties" : {
            "additionalInformation" : {
              "type" : "string",
              "description" : "Additional information to be appended to the whatsapp message.",
              "maxLength" : 1024,
              "minLength" : 0
            },
            "before" : {
              "type" : "string",
              "format" : "duration",
              "description" : "How much before the start of the event the notification needs to be triggered, in ISO8601 duration format.For sending the notification 15 minutes before the event, PT15M is a valid value.",
              "examples" : [ "PT1H", "PT30M" ]
            },
            "id" : {
              "type" : "string",
              "format" : "uuid",
              "description" : "The notification id."
            },
            "locale" : {
              "type" : "string",
              "format" : "locale",
              "description" : "Locale to be used to send the notification."
            },
            "phone" : {
              "type" : "string",
              "description" : "The phone number of the receiver, in e164 format."
            }
          }
        } ],
        "required" : [ "additionalInformation", "before", "id", "locale", "phone" ]
      },
      "WhatsappConfirmationCalendarEventNotification" : {
        "allOf" : [ {
          "$ref" : "#/components/schemas/CalendarEventNotification"
        }, {
          "type" : "object",
          "properties" : {
            "additionalInformation" : {
              "type" : "string",
              "description" : "Additional information to be appended to the whatsapp message.",
              "maxLength" : 1024,
              "minLength" : 0
            },
            "id" : {
              "type" : "string",
              "format" : "uuid",
              "description" : "The notification id."
            },
            "locale" : {
              "type" : "string",
              "format" : "locale",
              "description" : "Locale to be used to send the notification."
            },
            "phone" : {
              "type" : "string",
              "description" : "The phone number of the receiver, in e164 format."
            }
          }
        } ],
        "required" : [ "id", "locale", "phone" ]
      },
      "Workflow" : {
        "type" : "object",
        "description" : "Represents a workflow configuration that defines automated processes triggered by specific events in the TimeTime system.\n\nWorkflows enable automation of common tasks and processes without requiring custom code. They consist of:\n- Triggers: Events that initiate the workflow (e.g., booking created, calendar event updated)\n- Actions: Tasks that are performed when the workflow is triggered (e.g., send email, update calendar)\n- Conditions: Optional rules that determine whether actions should be executed\n\nWorkflows can be used to automate notifications, integrate with external systems, manage resource availability,\nand streamline booking processes. They are a powerful tool for customizing TimeTime to fit specific business needs.",
        "properties" : {
          "actions" : {
            "type" : "array",
            "description" : "The ordered list of actions that will be executed when the workflow is triggered. Actions define what the workflow does, such as sending emails, updating calendars, or calling webhooks. Actions are executed in sequence, and each action type has specific configuration options.",
            "items" : {
              "oneOf" : [ {
                "$ref" : "#/components/schemas/AfterConfirmingBookingWorkflowAction"
              }, {
                "$ref" : "#/components/schemas/GoogleCalendarEventBookingNotification"
              }, {
                "$ref" : "#/components/schemas/GoogleCalendarOutOfOfficeBookingNotification"
              } ]
            }
          },
          "id" : {
            "type" : "string",
            "format" : "uuid",
            "description" : "The unique identifier of the workflow",
            "example" : "123e4567-e89b-12d3-a456-426614174000"
          },
          "name" : {
            "type" : "string",
            "description" : "A descriptive name for the workflow that helps identify its purpose",
            "example" : "Send confirmation email after booking"
          },
          "owner" : {
            "description" : "Information about the owner of this workflow. The owner has full control over the workflow, including the ability to modify its configuration, delete it, and manage its triggers and actions. Workflows can be owned by individual users or by organizations.",
            "oneOf" : [ {
              "$ref" : "#/components/schemas/WorkflowOwnerOrg"
            }, {
              "$ref" : "#/components/schemas/WorkflowOwnerUser"
            } ]
          },
          "tags" : {
            "type" : "object",
            "additionalProperties" : {
              "type" : "string"
            },
            "description" : "Custom key-value pairs that provide additional metadata and categorization for the workflow. Tags can be used to organize workflows by purpose, department, or any other relevant criteria.",
            "example" : {
              "department" : "Sales",
              "priority" : "High",
              "version" : "1.0"
            }
          },
          "trigger" : {
            "description" : "The trigger configuration that determines when this workflow is executed. Triggers define the events that initiate the workflow, such as booking creation, calendar updates, or resource changes. Each trigger type has specific configuration options relevant to that event type.",
            "oneOf" : [ {
              "$ref" : "#/components/schemas/AfterConfirmingBookingTrigger"
            }, {
              "$ref" : "#/components/schemas/BeforeEventTrigger"
            } ]
          }
        },
        "required" : [ "actions", "id", "name", "owner", "tags" ]
      },
      "WorkflowAction" : {
        "type" : "object",
        "description" : "Base model for all workflow actions. Workflow actions define the operations that are executed when a workflow is triggered. Different types of actions serve different purposes and may be triggered by specific events.",
        "discriminator" : {
          "propertyName" : "type"
        },
        "properties" : {
          "type" : {
            "type" : "string"
          }
        },
        "required" : [ "type" ]
      },
      "WorkflowOwner" : {
        "type" : "object",
        "description" : "Base model that identifies the owner of a workflow. The owner determines who has permission to manage and modify the workflow. Workflows can be owned by either individual users or organizations.",
        "discriminator" : {
          "propertyName" : "type"
        },
        "properties" : {
          "type" : {
            "type" : "string"
          }
        },
        "required" : [ "type" ]
      },
      "WorkflowOwnerOrg" : {
        "allOf" : [ {
          "$ref" : "#/components/schemas/WorkflowOwner"
        }, {
          "type" : "object",
          "properties" : {
            "id" : {
              "type" : "string",
              "format" : "uuid",
              "description" : "The unique identifier of the organization that owns this workflow",
              "example" : "123e4567-e89b-12d3-a456-426614174000"
            }
          }
        } ],
        "description" : "Specifies that a workflow is owned by an organization. Organization-owned workflows can be accessed by organization administrators and potentially other members based on organization permissions.",
        "required" : [ "id" ]
      },
      "WorkflowOwnerUser" : {
        "allOf" : [ {
          "$ref" : "#/components/schemas/WorkflowOwner"
        }, {
          "type" : "object",
          "properties" : {
            "id" : {
              "type" : "string",
              "format" : "uuid",
              "description" : "The unique identifier of the user who owns this workflow",
              "example" : "123e4567-e89b-12d3-a456-426614174000"
            }
          }
        } ],
        "description" : "Specifies that a workflow is owned by an individual user. User-owned workflows are accessible only to that specific user, or to others if explicitly shared.",
        "required" : [ "id" ]
      },
      "WorkflowTrigger" : {
        "type" : "object",
        "description" : "Base model that defines when a workflow should be executed. Different trigger types allow workflows to respond to different system events, such as booking confirmations or upcoming calendar events.",
        "discriminator" : {
          "propertyName" : "type"
        },
        "properties" : {
          "type" : {
            "type" : "string"
          }
        },
        "required" : [ "type" ]
      },
      "WorkflowsList" : {
        "type" : "object",
        "description" : "A collection of workflow configurations returned by the API",
        "properties" : {
          "workflows" : {
            "type" : "array",
            "description" : "The list of workflows available to the current user",
            "items" : {
              "$ref" : "#/components/schemas/Workflow"
            },
            "uniqueItems" : true
          }
        },
        "required" : [ "workflows" ]
      },
      "ZonedDateTime" : {
        "type" : "object",
        "description" : "Represents a date and time with timezone information. This model combines an ISO 8601 formatted date-time with an optional IANA timezone identifier, allowing for precise time representation across different geographical locations. If the timezone is not specified, the offset provided in the dateTime field is used.",
        "properties" : {
          "dateTime" : {
            "type" : "string",
            "format" : "date-time",
            "description" : "The date and time value in ISO 8601 format, including UTC offset. This field must include the time offset (e.g., Z for UTC, or +01:00 for CET).",
            "example" : "2023-06-15T14:30:00+02:00"
          },
          "timeZone" : {
            "type" : "string",
            "description" : "The IANA Time Zone Database identifier that specifies the timezone context for this date-time. This allows for proper handling of daylight saving time transitions and regional time rules. If provided, the system will interpret the date-time in this timezone regardless of the offset in the dateTime field.",
            "example" : "Europe/Madrid",
            "examples" : [ "America/New_York", "Asia/Tokyo", "Europe/London", "Australia/Sydney" ]
          }
        },
        "required" : [ "dateTime" ]
      },
      "ZonedDateTimeInterval" : {
        "type" : "object",
        "description" : "Represents a time interval with specific start and end times, including timezone information. This model is used throughout the API for specifying time ranges for events, availability, bookings, and more. The interval follows the mathematical convention of being inclusive at the start and exclusive at the end, making it ideal for representing exact time slots without ambiguity.",
        "properties" : {
          "exclusiveEnd" : {
            "$ref" : "#/components/schemas/ZonedDateTime",
            "description" : "The ending point of the interval, exclusive. This means the interval includes times up to, but not including, this exact moment. For example, a one-hour booking starting at 2:00 PM would have this value set to 3:00:00 PM."
          },
          "inclusiveStart" : {
            "$ref" : "#/components/schemas/ZonedDateTime",
            "description" : "The starting point of the interval, inclusive. This means the interval includes this exact moment. For example, a booking starting at 2:00 PM would have this value set to 2:00:00 PM."
          }
        },
        "required" : [ "exclusiveEnd", "inclusiveStart" ]
      }
    },
    "securitySchemes" : {
      "HttpAuth" : {
        "bearerFormat" : "JWT or TimeTime API Key",
        "description" : "Authentication for the TimeTime API can be done in two ways:\n\n1. **JWT Token**: For user sessions and frontend applications. Obtained through the authentication endpoints.\n2. **API Key**: For server-to-server integrations and automated processes. Generate API keys through the API Key management endpoints.\n\nAll tokens should be provided in the Authorization header as a Bearer token.\n                                ",
        "name" : "HttpAuth",
        "scheme" : "bearer",
        "type" : "http"
      }
    }
  }
};