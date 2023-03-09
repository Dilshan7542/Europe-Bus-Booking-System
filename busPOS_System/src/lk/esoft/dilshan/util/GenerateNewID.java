package lk.esoft.dilshan.util;

public class GenerateNewID {
    public static String generateID(String field,String id){
        if(id !=null){
            final String[] split = id.split(field);
            int num=Integer.parseInt(split[1])+1;
            return String.format(field+"%03d",num);
        }else{
            return field+"000";
        }

    }
}
