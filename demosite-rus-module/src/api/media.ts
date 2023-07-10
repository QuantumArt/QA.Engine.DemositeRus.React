import { ApolloClient, NormalizedCacheObject, gql } from '@apollo/client';

interface EventsQueryResult {
  events: {
    items: {
      id: number;
      title: string;
      text: string;
      textBelow?: string;
      eventDate: string;
      eventImages: {
        id: number;
        title: string;
        image: string;
        sortOrder: number;
      }[];
    }[];
  };
}

interface MediaEventImage {
  id: number;
  title: string;
  image: string;
}

interface MediaEventImage {
  id: number;
  title: string;
  image: string;
}

export interface MediaEvent {
  id: number;
  title: string;
  text: string;
  textBelow?: string;
  images: MediaEventImage[];
}

export class MediaStore {
  public events: MediaEvent[] = [];
  public firstDay: MediaEvent | null = null;
  public prevDays: MediaEvent[] = [];

  constructor(private readonly client: ApolloClient<NormalizedCacheObject>) {}

  public init = async () => {
    try {
      const events = await this.getEvents();

      this.events = events;
      this.firstDay = events?.length ? events[0] : null;
      this.prevDays = events?.length ? events.slice(1) : [];
    } catch (e) {
      console.error(e);
    }
  };

  private getEvents = async () => {
    const query = gql`
      query getEvents {
        events {
          items {
            id
            title
            text
            textBelow
            eventDate
            eventImages {
              id
              title
              image
              sortOrder
            }
          }
        }
      }
    `;

    const { data }: { data: EventsQueryResult } = await this.client.query({
      query,
    });

    if (!data?.events?.items?.length) {
      return [];
    }

    const events = data.events.items.map(
      ({ id, title, text, textBelow, eventDate, eventImages }) => ({
        id,
        title,
        text,
        textBelow,
        eventDate,
        images:
          eventImages?.map(({ id, title, image, sortOrder }) => ({
            id,
            title,
            image,
            sortOrder,
          })) ?? [],
      }),
    );

    for (const event of events) {
      event.images?.sort((a, b) => a.sortOrder - b.sortOrder);
    }

    events.sort((a, b) => new Date(b.eventDate).getTime() - new Date(a.eventDate).getTime());

    return events;
  };
}
