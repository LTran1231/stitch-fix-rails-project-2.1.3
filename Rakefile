# Add your own tasks in files placed in lib/tasks ending in .rake,
# for example lib/tasks/capistrano.rake, and they will automatically be available to Rake.

require File.expand_path('../config/application', __FILE__)

Rails.application.load_tasks

task :new_submission, [:zip_file,:name] do |t,args|
  FileUtils.mkdir_p "submission"
  chdir "submission" do
    puts `unzip #{args.zip_file}`
    chdir File.basename(args.zip_file,".zip") do
      puts `rsync --exclude .git --exclude tmp --exclude logs --exclude submission --exclude __MACOSX -av  --delete . ../..`
    end
  end
  FileUtils.rm_rf 'submission'
  puts `git checkout -b #{args.name.gsub(/\s/,'-').downcase}`
  raise unless $?.success?
  puts `git add .`
  raise unless $?.success?
  puts `git commit -m "#{args.name}"`
  raise unless $?.success?
end
