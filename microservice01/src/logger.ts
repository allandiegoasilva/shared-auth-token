import * as winston from 'winston';
import WinstonGelfTransporter from 'winston-gelf-transporter';
import TransportStream from 'winston-transport';



const transporter = new WinstonGelfTransporter({
  host: 'logstash',
  port: 12201,
  protocol: 'udp',
  hostName: 'microservice01',
  
});

export const logger = winston.createLogger({
  level: 'info',
  transports: [
    new winston.transports.Console(), 
    transporter as TransportStream
  ],
});

console.log = (message) => {
  logger.info(message);
}