require 'sinatra'
require 'mqtt'

set :public_folder, File.dirname(__FILE__) + '/public'
puts File.dirname(__FILE__) + '/public'

get '/' do
  erb :index
end

get '/readings' do
  headers 'Content-Type' => 'text/event-stream'
  stream do |out|
    MQTT::Client.connect('localhost') do |c|
      c.get('readings') do |topic, message|
        out << "data: #{message}\n\n"
      end
    end
  end
end
