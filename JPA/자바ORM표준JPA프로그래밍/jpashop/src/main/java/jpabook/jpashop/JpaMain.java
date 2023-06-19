package jpabook.jpashop;

import jpabook.jpashop.domain.Order;
import jpabook.jpashop.domain.OrderItem;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.EntityTransaction;
import javax.persistence.Persistence;

public class JpaMain {
    public static void main(String[] args) {
        // 1. META-INF/Persistence.xml 에서 설정 정보를 조회해서 EntityManagerFactory를 생성 한다.
        EntityManagerFactory emf = Persistence.createEntityManagerFactory("hello"); //<persistence-unit name="hello"> 때문에 hello로 설정
        // 2. EntityManagerFactory에서 EntityManager를 생성 한다.
        EntityManager em = emf.createEntityManager();

        // 3. 트렌젝션
        EntityTransaction tx = em.getTransaction();
        tx.begin();

        try {
            Order order = new Order();
            em.persist(order);

            OrderItem orderItem = new OrderItem();
            orderItem.setOrder(order);

            em.persist(orderItem);

            tx.commit();
        } catch (Exception e) {
            tx.rollback();
        } finally {
            // 마무리작업으로 EntityManager를 닫아야 한다.
            em.close();
        }
        // 마무리작업으로 EntityManagerFactory를 닫아야 한다.
        emf.close();
    }
}